import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Wrapper, { ThemeToggleButton } from "./style";
import { Droppable, Draggable, DragDropContext } from '@hello-pangea/dnd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GlobalStyle, ModalOverlay, ModalContent, MemberSelect, PrioritySelect } from "../Dashboard/style";
import {
    FiSearch, FiPlus, FiVolume2, FiBell, FiHelpCircle,
    FiInbox, FiCalendar, FiGrid, FiLayers, FiMoreVertical,
    FiStar, FiUsers, FiShare2, FiSettings, FiX, FiInfo,
    FiLink2, FiImage, FiClock, FiLogOut, FiAlignLeft, FiTag, FiCheckSquare,
    FiSun, FiMoon, FiTrash2
} from "react-icons/fi";
import { notifySuccess, notifyError } from '../../utils/toast';
import useBoardForm, { parseMemberEmails, parseCsvValues } from '../../hooks/useBoardForm';

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/').replace(/\/+$/, '');
const UPDATE_BOARD_ENDPOINT = '/boards/update';
const DELETE_BOARD_ENDPOINT = '/boards/delete';
const LISTS_ENDPOINT = '/lists';
const CREATE_BOARD_ENDPOINT = '/boards/create';

const DEFAULT_LIST_NAME = 'Today Task';
const DEFAULT_LIST_STORAGE_PREFIX = 'boardwise-default-list-synced';
const USER_SETTINGS_STORAGE_KEY = 'boardwise:user-settings';
const DEFAULT_USER_SETTINGS = Object.freeze({
    emailNotifications: true,
    pushNotifications: true,
    dailyDigest: false,
    compactMode: false,
    autoArchiveCompleted: false,
    defaultBoardView: 'board',
    preferredTheme: 'dark',
});

const getListId = (listLike) => listLike?._id || listLike?.listId || listLike?.id;

const normalizeListPayload = (listPayload, fallbackTitle) => ({
    id: (getListId(listPayload) || `temp-list-${Date.now()}`).toString(),
    title: listPayload?.title || fallbackTitle || 'Untitled List',
    cards: Array.isArray(listPayload?.cards) ? listPayload.cards : [],
    position: typeof listPayload?.position === 'number' ? listPayload.position : null,
});

const buildDefaultTodayTasks = () => {
    const now = new Date();
    const isoNow = now.toISOString();
    const todayIso = isoNow.split('T')[0];
    const tomorrow = new Date(now.getTime());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowIso = tomorrow.toISOString().split('T')[0];
    const baseId = Date.now();

    return [
        {
            id: `seed-task-${baseId}-1`,
            title: 'Review priority tickets',
            description: 'Check newly assigned tickets and tag blockers for the squad.',
            members: 'You',
            dueDate: todayIso,
            priority: 'High',
            createdAt: isoNow,
        },
        {
            id: `seed-task-${baseId}-2`,
            title: 'Share standup notes',
            description: 'Write a quick summary of progress so everyone stays aligned.',
            members: 'You',
            dueDate: todayIso,
            priority: 'Medium',
            createdAt: isoNow,
        },
        {
            id: `seed-task-${baseId}-3`,
            title: 'Plan next sprint focus',
            description: 'Outline the top items for tomorrow to keep momentum.',
            members: 'You',
            dueDate: tomorrowIso,
            priority: 'Low',
            createdAt: isoNow,
        },
    ];
};

const buildDefaultList = () => ({
    id: `temp-default-list-${Date.now()}`,
    title: DEFAULT_LIST_NAME,
    cards: [],
});

const getDefaultListStorageKey = (boardId) => `${DEFAULT_LIST_STORAGE_PREFIX}:${boardId}`;

const hasSyncedDefaultList = (boardId) => {
    if (typeof window === 'undefined' || !boardId) return false;
    try {
        const value = window.localStorage.getItem(getDefaultListStorageKey(boardId));
        return value === 'true';
    } catch (error) {
        console.warn('Unable to read default list sync flag', error);
        return false;
    }
};

const markDefaultListSynced = (boardId) => {
    if (typeof window === 'undefined' || !boardId) return;
    try {
        window.localStorage.setItem(getDefaultListStorageKey(boardId), 'true');
    } catch (error) {
        console.warn('Unable to persist default list sync flag', error);
    }
};

const getBoardId = (boardLike) => boardLike?.boardId || boardLike?._id || boardLike?.id;

const readTrashedBoardIds = () => {
    if (typeof window === 'undefined') return new Set();
    try {
        const stored = window.localStorage.getItem('trashedBoards');
        if (!stored) return new Set();
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return new Set();
        return new Set(
            parsed
                .map((entry) => getBoardId(entry?.boardData) || entry?.id)
                .filter(Boolean)
        );
    } catch (error) {
        console.warn('Unable to read trashed boards from storage', error);
        return new Set();
    }
};

const readStoredUserSettings = () => {
    const fallback = { ...DEFAULT_USER_SETTINGS };
    if (typeof window === 'undefined') return fallback;
    try {
        const stored = window.localStorage.getItem(USER_SETTINGS_STORAGE_KEY);
        if (!stored) return fallback;
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
            return { ...fallback, ...parsed };
        }
        return fallback;
    } catch (error) {
        console.warn('Unable to read stored user settings', error);
        return fallback;
    }
};

const sanitizeText = (value) => (typeof value === 'string' ? value.trim() : '');

const deriveUserNameParts = (user) => {
    if (!user) return { first: '', last: '' };

    const directFirst = sanitizeText(user.firstName || user.firstname);
    const directLast = sanitizeText(user.lastName || user.lastname);
    if (directFirst || directLast) {
        return { first: directFirst, last: directLast };
    }

    const fullName = sanitizeText(user.name || user.fullName);
    if (fullName) {
        const segments = fullName.split(/\s+/).filter(Boolean);
        if (segments.length === 1) {
            return { first: segments[0], last: '' };
        }
        return { first: segments[0], last: segments[segments.length - 1] };
    }

    const emailLocalPart = sanitizeText((user.email || '').split('@')[0]);
    if (emailLocalPart) {
        const normalized = emailLocalPart.replace(/[._-]+/g, ' ').trim();
        const segments = normalized ? normalized.split(/\s+/).filter(Boolean) : [emailLocalPart];
        return {
            first: segments[0] || emailLocalPart,
            last: segments.length > 1 ? segments[segments.length - 1] : '',
        };
    }

    return { first: '', last: '' };
};

const getUserEmailAddress = (user) =>
    sanitizeText(user?.email) || sanitizeText(user?.contactEmail) || sanitizeText(user?.username) || '';

const buildUserDisplayName = (user, parts) => {
    const directName = sanitizeText(user?.name) || sanitizeText(user?.fullName);
    if (directName) return directName;
    const fromParts = `${sanitizeText(parts.first)} ${sanitizeText(parts.last)}`.trim();
    if (fromParts) return fromParts;
    return getUserEmailAddress(user) || 'BoardWise User';
};

const buildUserInitials = (parts, email) => {
    const firstInitial = sanitizeText(parts.first).charAt(0);
    const lastInitial = sanitizeText(parts.last).charAt(0);
    if (firstInitial && lastInitial) {
        return `${firstInitial}${lastInitial}`.toUpperCase();
    }
    if (firstInitial) {
        const fallbackSecond = sanitizeText(parts.first).charAt(1) || sanitizeText(email).replace(/[^a-zA-Z]/g, '').charAt(0) || 'W';
        return `${firstInitial}${fallbackSecond || 'W'}`.toUpperCase();
    }
    const cleanedEmail = sanitizeText(email).replace(/[^a-zA-Z]/g, '');
    if (cleanedEmail.length >= 2) {
        return `${cleanedEmail[0]}${cleanedEmail[cleanedEmail.length - 1]}`.toUpperCase();
    }
    if (cleanedEmail.length === 1) {
        return `${cleanedEmail[0]}W`.toUpperCase();
    }
    return 'BW';
};

const BoardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [theme, setTheme] = useState(DEFAULT_USER_SETTINGS.preferredTheme);
    const [boardDetails, setBoardDetails] = useState(null);
    const [boardDescription, setBoardDescription] = useState('');
    const [boardName, setBoardName] = useState("My Trello board");
    const [isUpdatingBoard, setIsUpdatingBoard] = useState(false);
    const [isDeletingBoard, setIsDeletingBoard] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [userSettings, setUserSettings] = useState(() => readStoredUserSettings());

    const {
        cardTitle,
        setCardTitle,
        cardDescription,
        setCardDescription,
        cardDueDate,
        setCardDueDate,
        cardPriority,
        setCardPriority,
        removeMembersInput,
        setRemoveMembersInput,
        inviteInput,
        setInviteInput,
        inviteEmails,
        setInviteEmails,
        handleInviteKeyDown,
        handleInviteBlur,
        handleRemoveInviteEmail,
        resetBoardForm,
    } = useBoardForm();
    const [lists, setLists] = useState(() => [buildDefaultList()]);
    const [isLoadingLists, setIsLoadingLists] = useState(false);
    const [listsError, setListsError] = useState(null);
    const [hasLoadedLists, setHasLoadedLists] = useState(false);
    const [listsFetchNonce, setListsFetchNonce] = useState(0);
    const [inboxCards, setInboxCards] = useState([]);
    const [isStarred, setIsStarred] = useState(false);
    const [isEditingBoardName, setIsEditingBoardName] = useState(false);
    const [isCreatingList, setIsCreatingList] = useState(false);
    const [isCreatingBoard, setIsCreatingBoard] = useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    const [userBoards, setUserBoards] = useState([]);
    const [boardSearchQuery, setBoardSearchQuery] = useState('');
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const [trashedBoardIds, setTrashedBoardIds] = useState(() => readTrashedBoardIds());
    const [isBoardSwitching, setIsBoardSwitching] = useState(false);
    const searchWrapperRef = useRef(null);
    const previousBoardIdRef = useRef(null);
    const hasAnimatedBoardChange = useRef(false);
    const activeBoardId = getBoardId(boardDetails);

    const [isInboxOpen, setIsInboxOpen] = useState(true);
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);
    const [isSwitchBoardsModalOpen, setIsSwitchBoardsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuClosing, setIsMenuClosing] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isNotificationsClosing, setIsNotificationsClosing] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isProfileMenuClosing, setIsProfileMenuClosing] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isSettingsClosing, setIsSettingsClosing] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "You have a new mention in a card." },
        { id: 2, text: "A new member joined the board." },
        { id: 3, text: "BoardWise update available." }
    ]);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isFeedbackClosing, setIsFeedbackClosing] = useState(false);

    const [addItemModal, setAddItemModal] = useState({
        isOpen: false,
        isClosing: false,
        type: null, // 'task', 'list', 'inbox', 'edit-task', 'edit-list'
        listId: null,
        editId: null
    });

    // View Task Details State
    const [viewTaskModal, setViewTaskModal] = useState({
        isOpen: false,
        isClosing: false,
        task: null
    });

    // Task Form State
    const [newItemText, setNewItemText] = useState("");
    const [newItemDesc, setNewItemDesc] = useState("");
    const [newItemMembers, setNewItemMembers] = useState("");
    const [newItemDate, setNewItemDate] = useState("");
    const [newItemPriority, setNewItemPriority] = useState("Medium");

    const isTempListId = (listId) => !listId || listId.toString().startsWith('temp-');
    const replaceListInState = (listId, updater) => {
        setLists((prev) => prev.map((list) => (list.id === listId ? updater(list) : list)));
    };

    const userEmail = useMemo(() => getUserEmailAddress(authUser), [authUser]);
    const userNameParts = useMemo(() => deriveUserNameParts(authUser), [authUser]);
    const userDisplayName = useMemo(
        () => buildUserDisplayName(authUser, userNameParts),
        [authUser, userNameParts]
    );
    const userInitials = useMemo(() => buildUserInitials(userNameParts, userEmail), [userNameParts, userEmail]);


    const hydrateBoard = useCallback((board) => {
        if (!board) return;
        setBoardDetails(board);
        setBoardName(board.title || 'My Trello board');
        setBoardDescription(board.description || '');
        try {
            sessionStorage.setItem('activeBoard', JSON.stringify(board));
        } catch (error) {
            console.warn('Unable to persist active board', error);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (!userSettings?.preferredTheme) return;
        setTheme((currentTheme) => (currentTheme === userSettings.preferredTheme ? currentTheme : userSettings.preferredTheme));
    }, [userSettings?.preferredTheme]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(USER_SETTINGS_STORAGE_KEY, JSON.stringify(userSettings));
        } catch (error) {
            console.warn('Unable to persist user settings', error);
        }
    }, [userSettings]);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const handleStorage = (event) => {
            if (event?.key && event.key !== 'trashedBoards') return;
            setTrashedBoardIds(readTrashedBoardIds());
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
        if (location.state?.board) {
            hydrateBoard(location.state.board);
            return;
        }

        try {
            const stored = sessionStorage.getItem('activeBoard');
            if (stored) {
                hydrateBoard(JSON.parse(stored));
            } else {
                navigate('/dash');
            }
        } catch (error) {
            console.warn('Unable to restore active board', error);
            navigate('/dash');
        }
    }, [hydrateBoard, location.state, navigate]);

    useEffect(() => {
        const loadAuthUser = () => {
            if (typeof window === 'undefined') return;
            try {
                const stored = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
                setAuthUser(stored ? JSON.parse(stored) : null);
            } catch (error) {
                console.warn('Unable to read auth user from storage', error);
                setAuthUser(null);
            }
        };

        loadAuthUser();
        window.addEventListener('storage', loadAuthUser);
        return () => window.removeEventListener('storage', loadAuthUser);
    }, []);

    useEffect(() => {
        if (!authUser?.userId) return;
        let isMounted = true;

        const fetchBoardsForUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/boards/${authUser.userId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000,
                });
                if (isMounted) {
                    setUserBoards(response?.data?.boards || []);
                }
            } catch (error) {
                console.error('Fetch boards error:', error);
            }
        };

        fetchBoardsForUser();
        return () => {
            isMounted = false;
        };
    }, [authUser]);

    useEffect(() => {
        if (!activeBoardId) {
            setIsLoadingLists(false);
            setListsError(null);
            setHasLoadedLists(false);
            setLists([buildDefaultList()]);
            previousBoardIdRef.current = null;
            return;
        }

        let isMounted = true;
        setIsLoadingLists(true);
        setListsError(null);
        setHasLoadedLists(false);
        if (previousBoardIdRef.current !== activeBoardId) {
            setLists([]);
            previousBoardIdRef.current = activeBoardId;
        }

        const loadLists = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}${LISTS_ENDPOINT}/${activeBoardId}`,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        timeout: 10000,
                    }
                );
                if (!isMounted) return;

                const fetchedLists = Array.isArray(response?.data?.lists) ? response.data.lists : [];
                const normalizedLists = fetchedLists
                    .map((list) => normalizeListPayload(list, list?.title))
                    .sort((a, b) => {
                        const aPos = typeof a.position === 'number' ? a.position : Number.MAX_SAFE_INTEGER;
                        const bPos = typeof b.position === 'number' ? b.position : Number.MAX_SAFE_INTEGER;
                        return aPos - bPos;
                    });

                if (normalizedLists.length) {
                    setLists(normalizedLists);
                } else {
                    setLists([buildDefaultList()]);
                }

                setHasLoadedLists(true);
            } catch (error) {
                if (!isMounted) return;
                const message = error.response?.data?.message || 'Failed to load lists';
                setListsError(message);
                notifyError(message);
                setLists([buildDefaultList()]);
                setHasLoadedLists(false);
            } finally {
                if (isMounted) {
                    setIsLoadingLists(false);
                }
            }
        };

        loadLists();

        return () => {
            isMounted = false;
        };
    }, [activeBoardId, listsFetchNonce]);

    const visibleUserBoards = useMemo(
        () => userBoards.filter((board) => !trashedBoardIds.has(getBoardId(board))),
        [userBoards, trashedBoardIds]
    );

    const availableBoards = useMemo(() => {
        if (!boardDetails) {
            return visibleUserBoards;
        }

        const activeId = getBoardId(boardDetails);
        const isActiveVisible = activeId && !trashedBoardIds.has(activeId);
        if (!isActiveVisible) {
            return visibleUserBoards;
        }

        const existsInList = visibleUserBoards.some((board) => getBoardId(board) === activeId);
        return existsInList ? visibleUserBoards : [boardDetails, ...visibleUserBoards];
    }, [visibleUserBoards, boardDetails, trashedBoardIds]);

    const filteredBoards = useMemo(() => {
        const query = boardSearchQuery.trim().toLowerCase();
        if (!query) return [];
        return availableBoards
            .filter((board) => (board?.title || '').toLowerCase().includes(query))
            .slice(0, 6);
    }, [boardSearchQuery, availableBoards]);

    const shouldShowSuggestions = isSearchDropdownOpen && boardSearchQuery.trim().length > 0;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!searchWrapperRef.current) return;
            if (!searchWrapperRef.current.contains(event.target)) {
                setIsSearchDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
            setUserSettings((prevSettings) => ({ ...prevSettings, preferredTheme: nextTheme }));
            return nextTheme;
        });
    };

    useEffect(() => {
        if (!activeBoardId) return;
        if (!hasAnimatedBoardChange.current) {
            hasAnimatedBoardChange.current = true;
            return;
        }
        setIsBoardSwitching(true);
        const timer = setTimeout(() => setIsBoardSwitching(false), 500);
        return () => clearTimeout(timer);
    }, [activeBoardId]);

    const updateBoardDetails = async (payload, successMessage) => {
        if (!activeBoardId) {
            notifyError('No active board selected.');
            return;
        }
        setIsUpdatingBoard(true);
        try {
            const response = await axios.patch(
                `${API_BASE_URL}${UPDATE_BOARD_ENDPOINT}/${activeBoardId}`,
                payload,
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000,
                }
            );
            const updatedBoard = response?.data?.board;
            if (updatedBoard) {
                setBoardDetails(updatedBoard);
                setBoardName(updatedBoard.title || boardName);
                setBoardDescription(updatedBoard.description || boardDescription);
                try {
                    sessionStorage.setItem('activeBoard', JSON.stringify(updatedBoard));
                } catch (storageError) {
                    console.warn('Unable to persist updated board', storageError);
                }
            }
            notifySuccess(response?.data?.message || successMessage || 'Board updated');
        } catch (error) {
            notifyError(error.response?.data?.message || 'Failed to update board');
            console.error('Update board detail error:', error);
        } finally {
            setIsUpdatingBoard(false);
        }
    };

    const handleRemoveMembers = async () => {
        const members = parseCsvValues(removeMembersInput);
        if (!members.length) {
            notifyError('Enter at least one member ID to remove.');
            return;
        }
        await updateBoardDetails({ removeMembers: members }, 'Members updated');
        setRemoveMembersInput('');
    };

    const handleDeleteBoard = async () => {
        if (!activeBoardId) {
            notifyError('No active board to delete.');
            return;
        }
        setIsDeletingBoard(true);
        try {
            await axios.delete(`${API_BASE_URL}${DELETE_BOARD_ENDPOINT}/${activeBoardId}`, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
            });
            notifySuccess('Board deleted successfully.');
            sessionStorage.removeItem('activeBoard');
            navigate('/dash');
        } catch (error) {
            notifyError(error.response?.data?.message || 'Failed to delete board');
            console.error('Delete board error:', error);
        } finally {
            setIsDeletingBoard(false);
        }
    };


    const [activeListMenu, setActiveListMenu] = useState(null); // ID of list with active menu

    const [contextMenu, setContextMenu] = useState({
        isOpen: false,
        type: null, // 'task' | 'list'
        id: null, // task or list id
        listId: null, // parent list id (for tasks)
        item: null, // the task or list object
        x: 0,
        y: 0
    });

    const hasDefaultListInState = useMemo(
        () => lists.some((list) => list.title?.toLowerCase() === DEFAULT_LIST_NAME.toLowerCase()),
        [lists]
    );

    useEffect(() => {
        if (!activeBoardId || !hasLoadedLists || !hasDefaultListInState) return;
        if (hasSyncedDefaultList(activeBoardId)) return;

        const syncDefaultList = async () => {
            const createdList = await createListOnServer(DEFAULT_LIST_NAME, { silent: true });
            if (!createdList) return;

            setLists((prev) => {
                const existingDefault = prev.find((list) => list.title?.toLowerCase() === DEFAULT_LIST_NAME.toLowerCase());
                const otherLists = prev.filter((list) => list !== existingDefault);
                return [{ ...createdList, cards: [] }, ...otherLists];
            });

            markDefaultListSynced(activeBoardId);
        };

        syncDefaultList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBoardId, hasDefaultListInState, hasLoadedLists]);

    const handleContextMenuClick = (e, type, item, listId = null) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();

        // Toggle if same item clicked, otherwise open new
        if (contextMenu.isOpen && contextMenu.id === item.id) {
            closeContextMenu();
        } else {
            setContextMenu({
                isOpen: true,
                type,
                id: item.id,
                listId,
                item,
                x: rect.right + 10, // Offset to right
                y: rect.top
            });
            // Close other menus if open
            if (activeListMenu) setActiveListMenu(null);
        }
    };

    const closeContextMenu = () => {
        setContextMenu({ isOpen: false, type: null, id: null, listId: null, item: null, x: 0, y: 0 });
    };

    const createListOnServer = async (title, { silent = false } = {}) => {
        if (!activeBoardId) {
            if (!silent) {
                notifyError('Select a board before creating lists.');
            }
            return null;
        }

        if (!silent) {
            setIsCreatingList(true);
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}${LISTS_ENDPOINT}`,
                {
                    title,
                    boardid: activeBoardId,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000,
                }
            );

            if (!silent) {
                notifySuccess(response?.data?.message || 'List created successfully');
            }

            return normalizeListPayload(response?.data?.list, title);
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create list';
            if (!silent) {
                notifyError(message);
            } else {
                console.error('Default list creation error:', message, error);
            }
            return null;
        } finally {
            if (!silent) {
                setIsCreatingList(false);
            }
        }
    };

    const updateListOnServer = async (listId, payload = {}) => {
        if (!listId) {
            notifyError('Unable to update list without a valid id.');
            return null;
        }
        const requestBody = {
            ...payload,
        };
        if (activeBoardId && requestBody.boardid === undefined && requestBody.boardId === undefined) {
            requestBody.boardid = activeBoardId;
        }
        try {
            const response = await axios.put(
                `${API_BASE_URL}${LISTS_ENDPOINT}/${listId}`,
                requestBody,
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000,
                }
            );
            notifySuccess(response?.data?.message || 'List updated');
            return normalizeListPayload(response?.data?.list || { ...payload, _id: listId }, payload?.title);
        } catch (error) {
            notifyError(error.response?.data?.message || 'Failed to update list');
            console.error('Update list error:', error);
            return null;
        }
    };

    const deleteListOnServer = async (listId) => {
        if (!listId) {
            notifyError('Unable to delete list without a valid id.');
            return false;
        }
        try {
            await axios.delete(`${API_BASE_URL}${LISTS_ENDPOINT}/${listId}`, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
            });
            notifySuccess('List deleted successfully');
            return true;
        } catch (error) {
            notifyError(error.response?.data?.message || 'Failed to delete list');
            console.error('Delete list error:', error);
            return false;
        }
    };

    const closeAddItemModal = () => {
        setAddItemModal(prev => ({ ...prev, isClosing: true }));
        setTimeout(() => {
            setAddItemModal({ isOpen: false, isClosing: false, type: null, listId: null, editId: null });
            setNewItemText("");
            setNewItemDesc("");
            setNewItemMembers("");
            setNewItemDate("");
            setNewItemPriority("Medium");
        }, 200);
    };

    const handleAddItemSubmit = async () => {
        const trimmedTitle = newItemText.trim();
        if (!trimmedTitle) {
            notifyError(addItemModal.type?.includes('list') ? 'List title is required.' : 'Task title is required.');
            return;
        }

        if (addItemModal.type === 'list') {
            const createdList = await createListOnServer(trimmedTitle);
            if (createdList) {
                setLists((prev) => [...prev, { ...createdList, cards: [] }]);
                closeAddItemModal();
            }
            return;
        }

        if (addItemModal.type === 'edit-list') {
            const targetList = lists.find((list) => list.id === addItemModal.editId);
            if (!targetList) {
                notifyError('List not found. Please refresh and try again.');
                closeAddItemModal();
                return;
            }

            if (isTempListId(targetList.id)) {
                const createdList = await createListOnServer(trimmedTitle);
                if (createdList) {
                    replaceListInState(targetList.id, (prevList) => ({
                        ...prevList,
                        ...createdList,
                        id: createdList.id,
                        title: createdList.title || trimmedTitle,
                        cards: prevList.cards,
                    }));
                }
                closeAddItemModal();
                handleRetryListsFetch();
                return;
            }

            const updatedList = await updateListOnServer(targetList.id, { title: trimmedTitle });
            if (updatedList) {
                replaceListInState(targetList.id, (prevList) => ({
                    ...prevList,
                    title: updatedList.title || trimmedTitle,
                }));
                closeAddItemModal();
                handleRetryListsFetch();
            }
            return;
        }

        if (addItemModal.type === 'task') {
            const newTask = {
                id: Date.now(),
                title: trimmedTitle,
                description: newItemDesc,
                members: newItemMembers,
                dueDate: newItemDate,
                priority: newItemPriority,
                createdAt: new Date().toISOString()
            };
            setLists((prev) =>
                prev.map((list) =>
                    list.id === addItemModal.listId ? { ...list, cards: [...list.cards, newTask] } : list
                )
            );
            closeAddItemModal();
            return;
        }

        if (addItemModal.type === 'edit-task') {
            if (addItemModal.listId === 'inbox') {
                setInboxCards((prev) =>
                    prev.map((card) =>
                        card.id === addItemModal.editId
                            ? {
                                ...card,
                                title: trimmedTitle,
                                description: newItemDesc,
                                members: newItemMembers,
                                dueDate: newItemDate,
                                priority: newItemPriority
                            }
                            : card
                    )
                );
            } else {
                setLists((prev) =>
                    prev.map((list) =>
                        list.id === addItemModal.listId
                            ? {
                                ...list,
                                cards: list.cards.map((card) =>
                                    card.id === addItemModal.editId
                                        ? {
                                            ...card,
                                            title: trimmedTitle,
                                            description: newItemDesc,
                                            members: newItemMembers,
                                            dueDate: newItemDate,
                                            priority: newItemPriority
                                        }
                                        : card
                                )
                            }
                            : list
                    )
                );
            }
            closeAddItemModal();
            return;
        }

        if (addItemModal.type === 'inbox') {
            const newTask = {
                id: Date.now(),
                title: trimmedTitle,
                description: newItemDesc,
                members: newItemMembers,
                dueDate: newItemDate,
                priority: newItemPriority,
                createdAt: new Date().toISOString()
            };
            setInboxCards((prev) => [...prev, newTask]);
            closeAddItemModal();
        }
    };

    const openTaskDetails = (task) => {
        setViewTaskModal({ isOpen: true, isClosing: false, task });
    };

    const closeTaskDetails = () => {
        setViewTaskModal(prev => ({ ...prev, isClosing: true }));
        setTimeout(() => {
            setViewTaskModal({ isOpen: false, isClosing: false, task: null });
        }, 200);
    };

    const openEditListModal = (list) => {
        setNewItemText(list.title);
        setAddItemModal({ isOpen: true, type: 'edit-list', editId: list.id });
        setActiveListMenu(null);
        closeContextMenu();
    };

    const openEditTaskModal = (task, listId) => {
        setNewItemText(task.title);
        setNewItemDesc(task.description || "");
        setNewItemMembers(task.members || "");
        setNewItemDate(task.dueDate || "");
        setNewItemPriority(task.priority || "Medium");
        setAddItemModal({ isOpen: true, type: 'edit-task', listId: listId, editId: task.id });
        closeContextMenu();
    };

    const deleteList = async (listId) => {
        if (!listId) return;

        if (isTempListId(listId)) {
            setLists((prev) => prev.filter((l) => l.id !== listId));
            setActiveListMenu(null);
            closeContextMenu();
            return;
        }

        const wasDeleted = await deleteListOnServer(listId);
        if (wasDeleted) {
            setLists((prev) => prev.filter((l) => l.id !== listId));
            handleRetryListsFetch();
        }
        setActiveListMenu(null);
        closeContextMenu();
    };

    const deleteTask = (listId, taskId) => {
        if (listId === 'inbox') {
            setInboxCards(inboxCards.filter(c => c.id !== taskId));
        } else {
            setLists(lists.map(list =>
                list.id === listId ? { ...list, cards: list.cards.filter(c => c.id !== taskId) } : list
            ));
        }
        closeContextMenu();
    };

    const handleRetryListsFetch = () => {
        setListsError(null);
        setListsFetchNonce((prev) => prev + 1);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setBoardSearchQuery(value);
        setIsSearchDropdownOpen(value.trim().length > 0);
    };

    const handleSearchFocus = () => {
        if (boardSearchQuery.trim().length > 0) {
            setIsSearchDropdownOpen(true);
        }
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (filteredBoards.length) {
                handleBoardSuggestionClick(filteredBoards[0]);
            }
        } else if (event.key === 'Escape') {
            setIsSearchDropdownOpen(false);
        }
    };

    const handleBoardSuggestionClick = (board) => {
        hydrateBoard(board);
        setBoardSearchQuery('');
        setIsSearchDropdownOpen(false);
        navigate('/board', { state: { board } });
    };

    const resolveOwnerId = () => (
        authUser?.userId ||
        authUser?._id ||
        boardDetails?.ownerId ||
        boardDetails?.ownerid ||
        boardDetails?.owner?._id ||
        boardDetails?.owner?.id
    );

    const openCreateBoardModal = () => {
        resetBoardForm();
        setIsBoardModalOpen(true);
    };

    const closeCreateBoardModal = () => {
        setIsBoardModalOpen(false);
        resetBoardForm();
    };

    const handleCreateBoard = async () => {
        if (isCreatingBoard) return;

        const trimmedTitle = cardTitle.trim();
        const trimmedDescription = cardDescription.trim();

        if (!trimmedTitle) {
            notifyError('Board title is required!');
            return;
        }

        const ownerId = resolveOwnerId();
        if (!ownerId) {
            notifyError('Missing owner information. Please sign in again.');
            return;
        }

        const normalizedTitle = trimmedTitle.toLowerCase();
        const duplicateExists = userBoards.some(
            (board) => (board?.title || '').trim().toLowerCase() === normalizedTitle
        );
        if (duplicateExists) {
            notifyError('A board with this name already exists. Please choose another name.');
            return;
        }

        setIsCreatingBoard(true);

        const boardPayload = {
            title: trimmedTitle,
            description: trimmedDescription,
            ownerId,
            memberIds: [ownerId],
        };

        const preparedInviteEmails = Array.from(
            new Set([...inviteEmails, ...parseMemberEmails(inviteInput)])
        );

        try {
            const response = await axios.post(
                `${API_BASE_URL}${CREATE_BOARD_ENDPOINT}`,
                boardPayload,
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000,
                }
            );

            const board = response?.data?.board;
            notifySuccess(response?.data?.message || 'Board created');

            if (board) {
                if (preparedInviteEmails.length && getBoardId(board)) {
                    try {
                        const inviteResponse = await axios.post(
                            `${API_BASE_URL}/boards/invite`,
                            {
                                email: preparedInviteEmails,
                                boardId: getBoardId(board),
                                invitedBy: ownerId,
                            },
                            {
                                headers: { 'Content-Type': 'application/json' },
                                timeout: 10000,
                            }
                        );
                        notifySuccess(inviteResponse?.data?.message || 'Invitations sent');
                    } catch (inviteError) {
                        notifyError(inviteError.response?.data?.message || 'Failed to invite members');
                        console.error('Invite members error:', inviteError);
                    }
                }

                hydrateBoard(board);
                setLists([buildDefaultList()]);
                setUserBoards((prev) => {
                    const exists = prev.some((existing) => getBoardId(existing) === getBoardId(board));
                    return exists ? prev : [...prev, board];
                });
                navigate('/board', { state: { board } });
                closeCreateBoardModal();
            }
        } catch (error) {
            notifyError(error.response?.data?.message || 'Failed to create board');
            console.error('Create board error:', error);
        } finally {
            setIsCreatingBoard(false);
        }
    };

    const closeFeedbackModal = () => {
        setIsFeedbackClosing(true);
        setTimeout(() => {
            setIsFeedbackModalOpen(false);
            setIsFeedbackClosing(false);
        }, 200);
    };

    const handleVolumeClick = () => {
        if (!isFeedbackModalOpen) {
            setIsFeedbackModalOpen(true);
        } else {
            closeFeedbackModal();
        }
    };

    const handleFeedbackSubmit = () => {
        alert("Thank you for your feedback!");
        closeFeedbackModal();
    };

    const openSettingsModal = () => {
        setIsSettingsClosing(false);
        setIsSettingsModalOpen(true);
    };

    const closeSettingsModal = () => {
        setIsSettingsClosing(true);
        setTimeout(() => {
            setIsSettingsModalOpen(false);
            setIsSettingsClosing(false);
        }, 200);
    };

    const handleSettingsToggle = (key) => {
        setUserSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSettingsSelectChange = (key, value) => {
        setUserSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handlePreferredThemeChange = (value) => {
        setUserSettings((prev) => ({ ...prev, preferredTheme: value }));
        setTheme(value);
    };

    const handleSettingsReset = () => {
        setUserSettings({ ...DEFAULT_USER_SETTINGS });
        setTheme(DEFAULT_USER_SETTINGS.preferredTheme);
    };

    const closeNotifications = () => {
        setIsNotificationsClosing(true);
        setTimeout(() => {
            setIsNotificationsOpen(false);
            setIsNotificationsClosing(false);
        }, 200);
    };

    const closeProfileMenu = () => {
        setIsProfileMenuClosing(true);
        setTimeout(() => {
            setIsProfileMenuOpen(false);
            setIsProfileMenuClosing(false);
        }, 200);
    };

    const closeMenu = () => {
        setIsMenuClosing(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsMenuClosing(false);
        }, 200);
    };

    const handleNotificationClick = () => {
        if (!isNotificationsOpen) {
            if (isProfileMenuOpen) closeProfileMenu();
            if (isMenuOpen) closeMenu();
            setIsNotificationsOpen(true);
        } else {
            closeNotifications();
        }
    };

    const handleProfileClick = () => {
        if (!isProfileMenuOpen) {
            if (isNotificationsOpen) closeNotifications();
            if (isMenuOpen) closeMenu();
            setIsProfileMenuOpen(true);
        } else {
            closeProfileMenu();
        }
    };

    const handleMenuClick = () => {
        if (!isMenuOpen) {
            if (isNotificationsOpen) closeNotifications();
            if (isProfileMenuOpen) closeProfileMenu();
            setIsMenuOpen(true);
        } else {
            closeMenu();
        }
    };

    const handleStarClick = () => {
        setIsStarred(!isStarred);
    };

    const handleUsersClick = () => {
        setIsVisibilityModalOpen(!isVisibilityModalOpen);
    };

    const handleShareClick = () => {
        setIsShareModalOpen(!isShareModalOpen);
    };

    // Replaced by handleMenuClick above
    // const handleMenuClick = () => {
    //    setIsMenuOpen(!isMenuOpen);
    // };

    const handleVisibilityOptionClick = (option) => {
        alert(`Visibility changed to "${option}".`);
        setIsVisibilityModalOpen(false);
    };

    const handleClearNotifications = () => {
        setNotifications([]);
    };

    // Clears cached auth data and routes visitor back to sign-in
    const handleLogout = () => {
        try {
            sessionStorage.removeItem('authUser');
            sessionStorage.removeItem('pendingUser');
            localStorage.removeItem('authUser');
            localStorage.removeItem('pendingUser');
        } catch (storageError) {
            console.warn('Unable to clear stored auth state during logout', storageError);
        }

        setAuthUser(null);

        closeProfileMenu();
        setTimeout(() => navigate('/'), 220);
    };

    const handleProfileOption = (option) => {
        if (option === 'Switch Account') {
            navigate('/switch');
        } else if (option === 'Manage Account') {
            navigate('/manage');
        } else if (option === 'Settings') {
            closeProfileMenu();
            setTimeout(() => {
                openSettingsModal();
            }, 220);
            return;
        } else if (option === 'Help') {
            navigate('/help');
        } else if (option === 'Log Out') {
            handleLogout();
            return;
        } else {
            alert(`${option} clicked`);
        }
        setIsProfileMenuOpen(false);
    };

    const toggleInbox = () => {
        setIsInboxOpen(!isInboxOpen);
    };

    const togglePlanner = () => {
        setIsPlannerOpen(!isPlannerOpen);
        if (!isPlannerOpen) {
            setIsInboxOpen(false); // Close inbox when opening planner
        }
    };

    const toggleSwitchBoards = () => {
        setIsSwitchBoardsModalOpen(!isSwitchBoardsModalOpen);
    };

    const handleLogoClick = () => {
        navigate('/dash');
    };

    const addNewList = () => {
        setNewItemText('');
        setAddItemModal({ isOpen: true, type: 'list' });
    };

    const addTaskToList = (listId) => {
        setAddItemModal({ isOpen: true, type: 'task', listId });
    };

    const addCardToInbox = () => {
        setAddItemModal({ isOpen: true, type: 'inbox' });
    };

    const handleBoardNameClick = () => {
        setIsEditingBoardName(true);
    };

    const handleBoardNameChange = (e) => {
        setBoardName(e.target.value);
    };

    const handleBoardNameBlur = () => {
        setIsEditingBoardName(false);
        const trimmed = boardName.trim();
        if (trimmed === '') {
            setBoardName(boardDetails?.title || 'My Trello board');
            return;
        }
        if (boardDetails && trimmed !== boardDetails.title) {
            updateBoardDetails({ title: trimmed }, 'Board renamed');
        }
    };

    const handleBoardNameKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleBoardNameBlur();
        }
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const onDragEnd = (result) => {
        const { source, destination, type } = result;

        if (!destination) return;

        // Handle List Reordering
        if (type === 'list') {
            const newLists = Array.from(lists);
            const [reorderedList] = newLists.splice(source.index, 1);
            newLists.splice(destination.index, 0, reorderedList);
            setLists(newLists);
            return;
        }

        // Handle Task Reordering/Moving
        const newInbox = Array.from(inboxCards);
        const newLists = lists.map(l => ({ ...l, cards: [...l.cards] }));

        // Identify Source Array
        let sourceCards;
        if (source.droppableId === 'inbox') {
            sourceCards = newInbox;
        } else {
            const sourceList = newLists.find(l => l.id.toString() === source.droppableId);
            if (sourceList) sourceCards = sourceList.cards;
        }

        // Identify Dest Array
        let destCards;
        if (destination.droppableId === 'inbox') {
            destCards = newInbox;
        } else {
            const destList = newLists.find(l => l.id.toString() === destination.droppableId);
            if (destList) destCards = destList.cards;
        }

        if (!sourceCards || !destCards) return;

        // Move
        const [moved] = sourceCards.splice(source.index, 1);
        destCards.splice(destination.index, 0, moved);

        // Update States
        setInboxCards(newInbox);
        setLists(newLists);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <GlobalStyle />
                <div className="board-container">
                    {/* Header */}
                    <header className="header-bar">
                        <div className="header-left">
                            <button type="button" className="logo-button" onClick={handleLogoClick}>
                                <img src="/BoardWise_logo_DashBoard.png" alt="BoardWise logo" className="logo-img" />
                            </button>
                        </div>
                        <div className="header-middle">
                            <div className="search-wrapper" ref={searchWrapperRef}>
                                <div className="search-box">
                                    <FiSearch className="search-icon" />
                                    <input
                                        type="text"
                                        id="search-input"
                                        placeholder="Search your boards..."
                                        className="search-input"
                                        value={boardSearchQuery}
                                        onChange={handleSearchChange}
                                        onFocus={handleSearchFocus}
                                        onKeyDown={handleSearchKeyDown}
                                        autoComplete="off"
                                    />
                                </div>
                                {shouldShowSuggestions && (
                                    <div className="search-suggestions">
                                        {filteredBoards.length ? (
                                            filteredBoards.map((board) => {
                                                const boardId = getBoardId(board) || board.title;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={boardId}
                                                        className="search-suggestion"
                                                        onClick={() => handleBoardSuggestionClick(board)}
                                                    >
                                                        <span className="suggestion-title">{board?.title || 'Untitled Board'}</span>
                                                        <span className="suggestion-subtitle">{board?.description || 'No description provided.'}</span>
                                                    </button>
                                                );
                                            })
                                        ) : (
                                            <div className="search-suggestion empty">No boards found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <button
                                className="create-btn"
                                onClick={openCreateBoardModal}
                                disabled={isCreatingBoard}
                            >
                                <FiPlus /> {isCreatingBoard ? 'Working...' : 'Create'}
                            </button>
                        </div>
                        <div className="header-right">
                            <FiVolume2 className={`icon ${isFeedbackModalOpen ? "active" : ""}`} onClick={handleVolumeClick} />
                            <FiBell className={`icon ${isNotificationsOpen ? "active" : ""}`} onClick={handleNotificationClick} />
                            <FiHelpCircle className="icon" />
                            <div className={`avatar ${isProfileMenuOpen ? "active-ring" : ""}`} onClick={handleProfileClick}>
                                {userInitials || 'BW'}
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="main-content">
                        {/* Inbox Sidebar (Conditionally rendered) */}
                        {isInboxOpen && !isPlannerOpen && (
                            <aside className="sidebar">
                                <div className="inbox-header">
                                    <FiInbox className="inbox-icon" />
                                    <h3>Inbox</h3>
                                </div>
                                <Droppable droppableId="inbox" type="task">
                                    {(provided) => (
                                        <div
                                            className="inbox-cards"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {inboxCards.map((task, idx) => {
                                                const taskId = task.id ? task.id.toString() : `inbox-${idx}`;
                                                return (
                                                    <Draggable key={taskId} draggableId={taskId} index={idx}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="card"
                                                                onClick={() => typeof task !== 'string' && openTaskDetails(task)}
                                                                style={{ ...provided.draggableProps.style, marginBottom: '8px' }}
                                                            >
                                                                <div className="card-header">
                                                                    <span>{typeof task === 'string' ? task : task.title}</span>
                                                                    {typeof task !== 'string' && (
                                                                        <div style={{ position: 'relative' }}>
                                                                            <FiMoreVertical
                                                                                className="card-actions"
                                                                                onClick={(e) => handleContextMenuClick(e, 'task', task, 'inbox')}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {typeof task !== 'string' && (
                                                                    <div className="card-meta">
                                                                        {task.priority && <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>}
                                                                        {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                <button className="add-card-btn dark" onClick={addCardToInbox}>
                                    <FiPlus /> Add a task
                                </button>
                            </aside>
                        )}

                        {/* Board Area / Calendar View */}
                        {!isPlannerOpen ? (
                            <section className={`board-area ${isBoardSwitching ? 'board-switching' : ''}`}>
                                {/* Board Title Header */}
                                <div className="header-row-2">
                                    <div className="team-selector">
                                        {isEditingBoardName ? (
                                            <input
                                                type="text"
                                                value={boardName}
                                                onChange={handleBoardNameChange}
                                                onBlur={handleBoardNameBlur}
                                                onKeyPress={handleBoardNameKeyPress}
                                                autoFocus
                                                className="board-name-input"
                                            />
                                        ) : (
                                            <span onClick={handleBoardNameClick} style={{ cursor: 'pointer' }}>{boardName}</span>
                                        )}
                                    </div>
                                    <div className="header-actions">
                                        <FiStar className={`action-icon ${isStarred ? "starred" : ""}`} onClick={handleStarClick} />
                                        <FiUsers className="action-icon" onClick={handleUsersClick} />
                                        <button className="share-btn" onClick={handleShareClick}><FiShare2 /> Share</button>
                                        <div className="menu-button" onClick={handleMenuClick}>
                                            <FiMoreVertical className="action-icon" />
                                        </div>
                                    </div>
                                </div>
                                {(isLoadingLists || listsError) && (
                                    <div className={`lists-status ${listsError ? 'error' : ''}`}>
                                        {isLoadingLists ? 'Loading lists…' : listsError}
                                        {listsError && (
                                            <button type="button" className="lists-retry" onClick={handleRetryListsFetch}>
                                                Retry
                                            </button>
                                        )}
                                    </div>
                                )}
                                <Droppable droppableId="board-lists" direction="horizontal" type="list">
                                    {(provided) => (
                                        <div
                                            className="board-lists"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {lists.map((list, index) => {
                                                return (
                                                    <Draggable key={list.id} draggableId={list.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                className="list-column"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                            >
                                                                <div className="list-header" {...provided.dragHandleProps}>
                                                                    <h4>{list.title}</h4>
                                                                    <div style={{ position: 'relative' }}>
                                                                        <FiMoreVertical
                                                                            className="list-menu"
                                                                            onClick={(event) => {
                                                                                event.stopPropagation();
                                                                                setActiveListMenu(activeListMenu === list.id ? null : list.id);
                                                                            }}
                                                                        />
                                                                        {activeListMenu === list.id && (
                                                                            <div className="context-menu" style={{ top: '20px', right: 0 }}>
                                                                                <div
                                                                                    className="context-menu-item"
                                                                                    onClick={(event) => {
                                                                                        event.stopPropagation();
                                                                                        openEditListModal(list);
                                                                                    }}
                                                                                >
                                                                                    Edit List
                                                                                </div>
                                                                                <div
                                                                                    className="context-menu-item delete"
                                                                                    onClick={(event) => {
                                                                                        event.stopPropagation();
                                                                                        deleteList(list.id);
                                                                                    }}
                                                                                >
                                                                                    Delete List
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <Droppable droppableId={list.id.toString()} type="task">
                                                                    {(provided) => (
                                                                        <div
                                                                            className="list-cards"
                                                                            ref={provided.innerRef}
                                                                            {...provided.droppableProps}
                                                                            style={{ minHeight: '10px' }}
                                                                        >
                                                                            {list.cards.map((task, i) => (
                                                                                <Draggable key={task.id} draggableId={task.id.toString()} index={i}>
                                                                                    {(provided) => (
                                                                                        <div
                                                                                            key={task.id || i}
                                                                                            className="card"
                                                                                            onClick={() => openTaskDetails(task)}
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                            style={{ ...provided.draggableProps.style, marginBottom: '8px' }}
                                                                                        >
                                                                                            <div className="card-header">
                                                                                                <span>{task.title}</span>
                                                                                                <div style={{ position: 'relative' }}>
                                                                                                    <FiMoreVertical
                                                                                                        className="card-actions"
                                                                                                        onClick={(e) => handleContextMenuClick(e, 'task', task, list.id)}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="card-meta">
                                                                                                {task.priority && <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>}
                                                                                                {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>}
                                                                                                {task.members && <span>👤 {task.members}</span>}
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            ))}
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                <button className="add-card-btn dark" onClick={() => addTaskToList(list.id)}>
                                                                    <FiPlus /> Add a task
                                                                </button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                            <button className="add-list-btn" onClick={addNewList}>
                                                <FiPlus /> Add another list
                                            </button>
                                        </div>
                                    )}
                                </Droppable>
                            </section>
                        ) : (
                            <section className="calendar-view">
                                <div className="calendar-header">
                                    <button className="calendar-nav-btn">‹</button>
                                    <h2 className="calendar-month">Dec 2025</h2>
                                    <button className="calendar-nav-btn">›</button>
                                    <button className="today-btn">Today</button>
                                </div>
                                <div className="week-calendar-body">
                                    <div className="week-header">
                                        <div className="time-column-header"></div>
                                        <div className="day-header active"><div className="day-label">Mon</div><div className="day-number">1</div></div>
                                        <div className="day-header"><div className="day-label">Tue</div><div className="day-number">2</div></div>
                                        <div className="day-header"><div className="day-label">Wed</div><div className="day-number">3</div></div>
                                        <div className="day-header"><div className="day-label">Thu</div><div className="day-number">4</div></div>
                                        <div className="day-header"><div className="day-label">Fri</div><div className="day-number">5</div></div>
                                        <div className="day-header"><div className="day-label">Sat</div><div className="day-number">6</div></div>
                                        <div className="day-header"><div className="day-label">Sun</div><div className="day-number">7</div></div>
                                    </div>
                                    <div className="week-grid-container">
                                        <div className="time-column">
                                            <div className="time-slot">9 AM</div>
                                            <div className="time-slot">10 AM</div>
                                            <div className="time-slot">11 AM</div>
                                        </div>
                                        <div className="week-days-grid"></div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </main>

                    {/* Footer Navigation */}
                    <footer className="footer-nav">
                        <div className={`nav-item ${isInboxOpen ? "active" : ""}`} onClick={toggleInbox}>
                            <div className="nav-icon"><FiInbox /></div>
                            <span>Inbox</span>
                        </div>
                        <div className={`nav-item ${isPlannerOpen ? "active" : ""}`} onClick={togglePlanner}>
                            <div className="nav-icon"><FiCalendar /></div>
                            <span>Planner</span>
                        </div>
                        <div className="nav-item active">
                            <div className="nav-icon"><FiGrid /></div>
                            <span>Board</span>
                        </div>
                        <div className={`nav-item ${isSwitchBoardsModalOpen ? "active" : ""}`} onClick={toggleSwitchBoards}>
                            <div className="nav-icon"><FiLayers /></div>
                            <span>Switch Boards</span>
                        </div>
                    </footer>
                </div>

                {/* Invisible Backdrop for closing header menus */}
                {
                    (isNotificationsOpen || isProfileMenuOpen || isMenuOpen || activeListMenu || contextMenu.isOpen) && (
                        <div
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998, cursor: 'default' }}
                            onClick={() => {
                                if (isNotificationsOpen) closeNotifications();
                                if (isProfileMenuOpen) closeProfileMenu();
                                if (isMenuOpen) closeMenu();
                                if (activeListMenu) setActiveListMenu(null);
                                if (contextMenu.isOpen) closeContextMenu();
                            }}
                        />
                    )
                }

                {/* Modals & Pop-ups */}
                {
                    isFeedbackModalOpen && (
                        <div className={`modal-overlay ${isFeedbackClosing ? 'closing' : ''}`}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>Share Your Thoughts</h3>
                                    <FiX className="modal-close-icon" onClick={closeFeedbackModal} />
                                </div>
                                <p style={{ marginBottom: '1rem', color: '#a1b0c0' }}>We'd love to hear your feedback on BoardWise.</p>
                                <textarea placeholder="Enter your feedback here..." rows="5"></textarea>
                                <button className="submit-btn" onClick={handleFeedbackSubmit}>Submit Feedback</button>
                            </div>
                        </div>
                    )
                }

                {
                    isNotificationsOpen && (
                        <div className={`notification-popup white ${isNotificationsClosing ? 'closing' : ''}`}>
                            <div className="notification-header">
                                <h3>Notifications</h3>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#4452FE', cursor: 'pointer' }} onClick={handleClearNotifications}>Clear All</span>
                                    <FiX className="modal-close-icon" onClick={closeNotifications} />
                                </div>
                            </div>
                            {notifications.length === 0 ? (
                                <div style={{ padding: '1rem', textAlign: 'center', color: '#a1b0c0' }}>No new notifications</div>
                            ) : (
                                notifications.map(notif => (
                                    <div key={notif.id} className="notification-item" onClick={() => alert("Notification clicked")}>
                                        {notif.text}
                                    </div>
                                ))
                            )}
                        </div>
                    )
                }

                {isBoardModalOpen && (
                    <ModalOverlay fullScreen>
                        <ModalContent>
                            <h3>Create New Board</h3>
                            <input
                                type="text"
                                placeholder="Title"
                                value={cardTitle}
                                onChange={(e) => setCardTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                value={cardDescription}
                                onChange={(e) => setCardDescription(e.target.value)}
                                rows="3"
                            ></textarea>
                            <div className="form-group">
                                <label>Due Date:</label>
                                <DatePicker
                                    selected={cardDueDate}
                                    onChange={(date) => setCardDueDate(date || new Date())}
                                    dateFormat="dd/MM/yyyy"
                                    className="date-picker"
                                />
                            </div>
                            <div className="form-group">
                                <label>Invite Members (emails):</label>
                                {inviteEmails.length > 0 && (
                                    <div className="invite-chip-list">
                                        {inviteEmails.map((email) => (
                                            <span key={email} className="invite-chip">
                                                {email}
                                                <button type="button" onClick={() => handleRemoveInviteEmail(email)} aria-label={`Remove ${email}`}>
                                                    &times;
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <MemberSelect
                                    as="input"
                                    type="text"
                                    placeholder="Type email and press Enter, comma, or Tab"
                                    value={inviteInput}
                                    onChange={(e) => setInviteInput(e.target.value)}
                                    onKeyDown={handleInviteKeyDown}
                                    onBlur={handleInviteBlur}
                                />
                                <small className="help-text">You can add multiple emails. Each invite receives an email to join the board.</small>
                            </div>
                            <div className="form-group">
                                <label>Priority:</label>
                                <PrioritySelect value={cardPriority} onChange={(e) => setCardPriority(e.target.value)}>
                                    <option value="Low">Low</option>
                                    <option value="Normal">Normal</option>
                                    <option value="High">High</option>
                                </PrioritySelect>
                            </div>
                            <div className="modal-buttons">
                                <button className="cancel-button" onClick={closeCreateBoardModal}>
                                    Cancel
                                </button>
                                <button
                                    className="primary-button"
                                    onClick={handleCreateBoard}
                                    disabled={isCreatingBoard}
                                >
                                    {isCreatingBoard ? 'Creating...' : 'Create Board'}
                                </button>
                            </div>
                        </ModalContent>
                    </ModalOverlay>
                )}

                {
                    isProfileMenuOpen && (
                        <div className={`profile-menu-popup white ${isProfileMenuClosing ? 'closing' : ''}`}>
                            <div className="profile-header">
                                <h3>Account</h3>
                                <FiX className="modal-close-icon" onClick={closeProfileMenu} />
                            </div>
                            <div className="user-info-section" style={{ paddingBottom: '1rem', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div className="avatar large" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                        {userInitials || 'BW'}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#fff' }}>{userDisplayName}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#9fadbc' }}>{userEmail || 'Add your email'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-item" onClick={() => handleProfileOption("Switch Account")}>Switch Account</div>
                            <div className="menu-item" onClick={() => handleProfileOption("Manage Account")}>Manage Account</div>
                            <div className="menu-item" onClick={() => handleProfileOption("Settings")}>Settings</div>
                            <div className="menu-item" onClick={() => handleProfileOption("Help")}>Help</div>
                            <div className="menu-item theme-option" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Theme</span>
                                <ThemeToggleButton onClick={toggleTheme}>
                                    {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
                                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                                </ThemeToggleButton>
                            </div>
                            <div
                                className="menu-item logout-item"
                                style={{
                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                    marginTop: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem'
                                }}
                                onClick={() => handleProfileOption('Log Out')}
                            >
                                <FiLogOut size={16} />
                                <span>Log Out</span>
                            </div>
                        </div>
                    )
                }

                {
                    isVisibilityModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>Change Visibility</h3>
                                    <FiX className="modal-close-icon" onClick={() => setIsVisibilityModalOpen(false)} />
                                </div>
                                <div className="visibility-option private" onClick={() => handleVisibilityOptionClick('Private')}>
                                    <h4>Private</h4>
                                    <p>Only board members can see this board.</p>
                                </div>
                                <div className="visibility-option workspace" onClick={() => handleVisibilityOptionClick('Workspace')}>
                                    <h4>Workspace</h4>
                                    <p>All members of the Trello Workspace can see and edit this board.</p>
                                </div>
                                <div className="visibility-option organization" onClick={() => handleVisibilityOptionClick('Organization')}>
                                    <h4>Organization</h4>
                                    <p>All members of the organization can see this board.</p>
                                </div>
                                <div className="visibility-option public" onClick={() => handleVisibilityOptionClick('Public')}>
                                    <h4>Public</h4>
                                    <p>Anyone on the internet can see this board.</p>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    isShareModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>Share board</h3>
                                    <FiX className="modal-close-icon" onClick={() => setIsShareModalOpen(false)} />
                                </div>
                                <input type="text" placeholder="Email address or name" className="share-input" />
                                <button className="share-button-action">Share</button>
                                <div className="share-link-section">
                                    <FiLink2 /> Share this board with a link
                                    <a href="#">Create link</a>
                                </div>
                                <div className="board-members">
                                    Board members <span>1</span>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    isSettingsModalOpen && (
                        <div className={`modal-overlay ${isSettingsClosing ? 'closing' : ''}`}>
                            <div className="modal-content settings-modal">
                                <div className="modal-header settings-header">
                                    <div>
                                        <h3>Workspace Settings</h3>
                                        <p className="settings-subtitle">Control how BoardWise behaves for your account.</p>
                                    </div>
                                    <FiX className="modal-close-icon" onClick={closeSettingsModal} />
                                </div>

                                <div className="settings-section">
                                    <h4>Notifications</h4>
                                    <div className="settings-row">
                                        <div>
                                            <p>Email updates</p>
                                            <span className="settings-row-subtitle">Get summaries when cards you follow change.</span>
                                        </div>
                                        <label className="settings-toggle" aria-label="Toggle email notifications">
                                            <input
                                                type="checkbox"
                                                checked={userSettings.emailNotifications}
                                                onChange={() => handleSettingsToggle('emailNotifications')}
                                            />
                                            <span className="toggle-track" aria-hidden="true"></span>
                                            <span className="toggle-value">{userSettings.emailNotifications ? 'On' : 'Off'}</span>
                                        </label>
                                    </div>
                                    <div className="settings-row">
                                        <div>
                                            <p>Push notifications</p>
                                            <span className="settings-row-subtitle">Be alerted immediately about mentions and assignments.</span>
                                        </div>
                                        <label className="settings-toggle" aria-label="Toggle push notifications">
                                            <input
                                                type="checkbox"
                                                checked={userSettings.pushNotifications}
                                                onChange={() => handleSettingsToggle('pushNotifications')}
                                            />
                                            <span className="toggle-track" aria-hidden="true"></span>
                                            <span className="toggle-value">{userSettings.pushNotifications ? 'On' : 'Off'}</span>
                                        </label>
                                    </div>
                                    <div className="settings-row">
                                        <div>
                                            <p>Daily digest</p>
                                            <span className="settings-row-subtitle">Receive a morning recap of due dates.</span>
                                        </div>
                                        <label className="settings-toggle" aria-label="Toggle daily digest">
                                            <input
                                                type="checkbox"
                                                checked={userSettings.dailyDigest}
                                                onChange={() => handleSettingsToggle('dailyDigest')}
                                            />
                                            <span className="toggle-track" aria-hidden="true"></span>
                                            <span className="toggle-value">{userSettings.dailyDigest ? 'On' : 'Off'}</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="settings-section">
                                    <h4>Board preferences</h4>
                                    <div className="settings-row">
                                        <div>
                                            <p>Default view</p>
                                            <span className="settings-row-subtitle">Choose what opens when you visit a board.</span>
                                        </div>
                                        <select
                                            value={userSettings.defaultBoardView || 'board'}
                                            onChange={(event) => handleSettingsSelectChange('defaultBoardView', event.target.value)}
                                        >
                                            <option value="board">Kanban Board</option>
                                            <option value="calendar">Calendar</option>
                                            <option value="inbox">Inbox</option>
                                        </select>
                                    </div>
                                    <div className="settings-row">
                                        <div>
                                            <p>Auto-archive completed</p>
                                            <span className="settings-row-subtitle">Move cards marked done to archive after 7 days.</span>
                                        </div>
                                        <label className="settings-toggle" aria-label="Toggle auto archive">
                                            <input
                                                type="checkbox"
                                                checked={userSettings.autoArchiveCompleted}
                                                onChange={() => handleSettingsToggle('autoArchiveCompleted')}
                                            />
                                            <span className="toggle-track" aria-hidden="true"></span>
                                            <span className="toggle-value">{userSettings.autoArchiveCompleted ? 'On' : 'Off'}</span>
                                        </label>
                                    </div>
                                    <div className="settings-row">
                                        <div>
                                            <p>Compact mode</p>
                                            <span className="settings-row-subtitle">Reduce spacing to fit more cards on screen.</span>
                                        </div>
                                        <label className="settings-toggle" aria-label="Toggle compact mode">
                                            <input
                                                type="checkbox"
                                                checked={userSettings.compactMode}
                                                onChange={() => handleSettingsToggle('compactMode')}
                                            />
                                            <span className="toggle-track" aria-hidden="true"></span>
                                            <span className="toggle-value">{userSettings.compactMode ? 'On' : 'Off'}</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="settings-section">
                                    <h4>Appearance</h4>
                                    <div className="settings-row">
                                        <div>
                                            <p>Theme</p>
                                            <span className="settings-row-subtitle">Applies to the entire workspace.</span>
                                        </div>
                                        <div className="theme-pill-group">
                                            {['dark', 'light'].map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    className={`theme-pill ${theme === option ? 'active' : ''}`}
                                                    onClick={() => handlePreferredThemeChange(option)}
                                                >
                                                    {option === 'dark' ? 'Dark' : 'Light'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="settings-actions">
                                    <button type="button" className="ghost-button" onClick={handleSettingsReset}>Reset to defaults</button>
                                    <button type="button" className="primary-button" onClick={closeSettingsModal}>Done</button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    isMenuOpen && (
                        <div className={`menu-popup white ${isMenuClosing ? 'closing' : ''}`}>
                            <div className="modal-header">
                                <h3>Menu</h3>
                                <FiX className="modal-close-icon" onClick={closeMenu} />
                            </div>
                            <div className="menu-item-with-icon"><FiShare2 /> Share</div>
                            <div className="menu-item-with-icon"><FiInfo /> About this board</div>
                            <div className="menu-item-with-icon"><FiUsers /> Visibility: Workspace</div>
                            <div className="menu-item-with-icon"><FiStar /> Star</div>
                            <div className="menu-item-with-icon"><FiSettings /> Settings</div>
                            <div className="menu-item-with-icon"><FiImage /> Change background</div>
                        </div>
                    )
                }



                {
                    isSwitchBoardsModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>Switch boards</h3>
                                    <FiX className="modal-close-icon" onClick={() => setIsSwitchBoardsModalOpen(false)} />
                                </div>
                                <div className="search-box-modal">
                                    <FiSearch />
                                    <input type="text" placeholder="Search your boards" />
                                </div>
                                <div className="board-list-modal">
                                    <div className="board-thumb all-boards">All</div>
                                    <div className="board-thumb recent-boards">Trello Workspace</div>
                                </div>
                                <div className="recent-boards-section">
                                    <h4>Recent</h4>
                                    <div className="board-thumbnails">
                                        <div className="board-thumbnail" style={{ backgroundImage: `url(${'/board-bg-1.png'})` }}>
                                            <p>My Trello board</p>
                                        </div>
                                        <div className="board-thumbnail" style={{ backgroundImage: `url(${'/board-bg-2.png'})` }}>
                                            <p>learn</p>
                                        </div>
                                        <div className="board-thumbnail" style={{ backgroundImage: `url(${'/board-bg-3.png'})` }}>
                                            <p>jnfjdj</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Add Item Modal */}
                {
                    addItemModal.isOpen && (
                        <div className={`modal-overlay ${addItemModal.isClosing ? 'closing' : ''}`}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>
                                        {(addItemModal.type === 'list' || addItemModal.type === 'edit-list') && (addItemModal.type === 'edit-list' ? "Edit List" : "Add Another List")}
                                        {(addItemModal.type === 'task' || addItemModal.type === 'edit-task') && (addItemModal.type === 'edit-task' ? "Edit Task" : "Create New Task")}
                                        {addItemModal.type === 'inbox' && "Add to Inbox"}
                                    </h3>
                                    <FiX className="modal-close-icon" onClick={closeAddItemModal} />
                                </div>

                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="share-input"
                                        autoFocus
                                        placeholder={addItemModal.type.includes('list') ? "Enter list title..." : "Task title"}
                                        value={newItemText}
                                        onChange={(e) => setNewItemText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addItemModal.type.includes('list') && handleAddItemSubmit()}
                                    />
                                </div>

                                {(addItemModal.type === 'task' || addItemModal.type === 'edit-task' || addItemModal.type === 'inbox') && (
                                    <>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                rows="3"
                                                placeholder="Add a more detailed description..."
                                                value={newItemDesc}
                                                onChange={(e) => setNewItemDesc(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Members</label>
                                                <input
                                                    type="text"
                                                    placeholder="Add members encoded..."
                                                    value={newItemMembers}
                                                    onChange={(e) => setNewItemMembers(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Due Date</label>
                                                <input
                                                    type="date"
                                                    value={newItemDate}
                                                    onChange={(e) => setNewItemDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Priority</label>
                                            <select
                                                value={newItemPriority}
                                                onChange={(e) => setNewItemPriority(e.target.value)}
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                <button
                                    className="submit-btn"
                                    onClick={handleAddItemSubmit}
                                    disabled={addItemModal.type === 'list' && isCreatingList}
                                >
                                    {addItemModal.type === 'list' && (isCreatingList ? 'Creating...' : 'Add List')}
                                    {addItemModal.type === 'edit-list' && 'Save List'}
                                    {addItemModal.type === 'task' && 'Create Task'}
                                    {addItemModal.type === 'edit-task' && 'Save Task'}
                                    {addItemModal.type === 'inbox' && 'Create Task'}
                                </button>
                            </div>
                        </div>
                    )
                }

                {
                    contextMenu.isOpen && contextMenu.type === 'task' && (
                        <div
                            className="context-menu"
                            style={{
                                position: 'fixed',
                                top: contextMenu.y,
                                left: contextMenu.x,
                                zIndex: 10001
                            }}
                        >
                            <div className="context-menu-item" onClick={(e) => { e.stopPropagation(); openEditTaskModal(contextMenu.item, contextMenu.listId); }}>Edit Task</div>
                            <div className="context-menu-item delete" onClick={(e) => { e.stopPropagation(); deleteTask(contextMenu.listId, contextMenu.id); }}>Delete</div>
                        </div>
                    )
                }

                {/* Task Details Modal */}
                {
                    viewTaskModal.isOpen && viewTaskModal.task && (
                        <div className={`modal-overlay ${viewTaskModal.isClosing ? 'closing' : ''}`}>
                            <div className="modal-content" style={{ maxWidth: '600px' }}>
                                <div className="modal-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FiCheckSquare style={{ color: '#4452FE', fontSize: '1.2rem' }} />
                                        <h3>{viewTaskModal.task.title}</h3>
                                    </div>
                                    <FiX className="modal-close-icon" onClick={closeTaskDetails} />
                                </div>

                                <div className="task-detail-row">
                                    <FiAlignLeft className="task-detail-icon" />
                                    <div className="task-detail-content">
                                        <div className="task-detail-label">Description</div>
                                        <div className="task-detail-value" style={{ color: '#b6c2cf', whiteSpace: 'pre-wrap' }}>
                                            {viewTaskModal.task.description || "No description provided."}
                                        </div>
                                    </div>
                                </div>

                                <div className="task-detail-meta">
                                    <div className="task-detail-row" style={{ marginBottom: 0 }}>
                                        <FiUsers className="task-detail-icon" />
                                        <div className="task-detail-content">
                                            <div className="task-detail-label">Members</div>
                                            <div className="task-detail-value">{viewTaskModal.task.members || "None"}</div>
                                        </div>
                                    </div>

                                    <div className="task-detail-row" style={{ marginBottom: 0 }}>
                                        <FiTag className="task-detail-icon" />
                                        <div className="task-detail-content">
                                            <div className="task-detail-label">Priority</div>
                                            <div className="task-detail-value">
                                                {viewTaskModal.task.priority &&
                                                    <span className={`badge ${viewTaskModal.task.priority.toLowerCase()}`} style={{ fontSize: '0.9rem', padding: '4px 8px' }}>
                                                        {viewTaskModal.task.priority}
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="task-detail-row" style={{ marginBottom: 0 }}>
                                        <FiCalendar className="task-detail-icon" />
                                        <div className="task-detail-content">
                                            <div className="task-detail-label">Due Date</div>
                                            <div className="task-detail-value">
                                                {viewTaskModal.task.dueDate ? new Date(viewTaskModal.task.dueDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : "No Date"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="task-detail-row" style={{ marginBottom: 0 }}>
                                        <FiClock className="task-detail-icon" />
                                        <div className="task-detail-content">
                                            <div className="task-detail-label">Created At</div>
                                            <div className="task-detail-value" style={{ fontSize: '0.9rem' }}>
                                                {viewTaskModal.task.createdAt ? new Date(viewTaskModal.task.createdAt).toLocaleString() : "Unknown"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Wrapper>
        </DragDropContext>
    );
};

export default BoardPage;