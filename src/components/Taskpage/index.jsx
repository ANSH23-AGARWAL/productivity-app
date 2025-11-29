import React, { useState } from "react";
import Wrapper from "./style";
import { 
    FiX, FiChevronDown, FiVolume2, FiMoreHorizontal, FiLink, 
    FiTag, FiCalendar, FiCheckSquare, FiUser, FiPaperclip, 
    FiPlus, FiSquare, FiEdit2, FiSearch, FiMessageSquare,
    FiEye, FiCopy, FiRepeat, FiShare2, FiArchive, FiUsers // Corrected: Added FiUsers here
} from "react-icons/fi";

const CardDetailPage = () => {
    // State for managing UI components
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [isLabelsOpen, setIsLabelsOpen] = useState(false);
    const [isCoverOpen, setIsCoverOpen] = useState(false);
    const [isVolumeModalOpen, setIsVolumeModalOpen] = useState(false);

    // Dummy data for example
    const lists = ["To Do", "In Progress", "Done"];
    const labels = ["Green", "Yellow", "Orange", "Red", "Purple", "Blue"];
    const images = [
        "https://images.unsplash.com/photo-1518791841075-f8644555543c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MTgwMjZ8MHwxfHNlYXJjaHwxfHxjb3ZlciUyMGltYWdlfGVufDB8fHx8fDE2OTU5MjE4MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1549722368-874e06263884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MTgwMjZ8MHwxfHNlYXJjaHwzfHxjb3ZlciUyMGltYWdlfGVufDB8fHx8fDE2OTU5MjE4MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1629854743431-10c08f656247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MTgwMjZ8MHwxfHNlYXJjaHw1fHxjb3ZlciUyMGltYWdlfGVufDB8fHx8fDE2OTU5MjE4MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1628178879612-421712a64b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MTgwMjZ8MHwxfHNlYXJjaHw2fHxjb3ZlciUyMGltYWdlfGVufDB8fHx8fDE2OTU5MjE4MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1628178879612-421712a64b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MTgwMjZ8MHwxfHNlYXJjaHw2fHxjb3ZlciUyMGltYWdlfGVufDB8fHx8fDE2OTU5MjE4MDF8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1629854743431-10c08f656247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MTgwMjZ8MHwxfHNlYXJjaHw1fHxjb3ZlciUyMGltYWdlfGVufDB8fHx8fDE2OTU5MjE4MDF8MA&ixlib=rb-4.0.3&q=80&w=1080"
    ];

    const handleMenuClick = () => { setIsMenuOpen(!isMenuOpen); };
    const handleAddClick = () => { setIsAddMenuOpen(!isAddMenuOpen); };
    const handleLabelsClick = () => { setIsLabelsOpen(!isLabelsOpen); };
    const handleCoverClick = () => { setIsCoverOpen(!isCoverOpen); };
    const handleVolumeClick = () => { setIsVolumeModalOpen(!isVolumeModalOpen); };

    return (
        <Wrapper>
            <div className="card-detail-page">
                {/* Header */}
                <header className="card-header">
                    <div className="list-selector">
                        to do <FiChevronDown />
                    </div>
                    <div className="header-actions">
                        <FiVolume2 onClick={handleVolumeClick} />
                        <FiMoreHorizontal onClick={handleMenuClick} />
                        <FiX />
                    </div>
                </header>

                {/* Main Content */}
                <main className="card-main">
                    {/* Left Section */}
                    <div className="left-section">
                        <div className="card-title">
                            <h1>rahul</h1>
                        </div>
                        <div className="card-actions">
                            <button className="add-button" onClick={handleAddClick}><FiPlus /> Add</button>
                            <button><FiTag /> Labels</button>
                            <button><FiCalendar /> Dates</button>
                            <button><FiCheckSquare /> Checklist</button>
                            <button><FiUser /> Members</button>
                            <button onClick={handleCoverClick}><FiPaperclip /> Cover</button>
                        </div>
                        <div className="description-section">
                            <h3>Description</h3>
                            <textarea placeholder="Add a more detailed description..."></textarea>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="right-section">
                        <div className="activity-section">
                            <div className="activity-header">
                                <FiMessageSquare /> Comments and activity
                                <button className="show-details-btn">Show details</button>
                            </div>
                            <textarea placeholder="Write a comment..."></textarea>
                            <div className="comment-list">
                                <div className="comment">
                                    <span className="user-initials">RS</span>
                                    <div className="comment-content">
                                        <div className="comment-meta">
                                            <b>rahul saini</b> added this card to to do
                                        </div>
                                        <p className="comment-date">
                                            Sep 5, 2025, 11:43 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Pop-ups & Modals */}
            {isVolumeModalOpen && (
                <div className="popup-modal">
                    <div className="modal-header">
                        <h3>Feedback</h3>
                        <FiX className="close-icon" onClick={() => setIsVolumeModalOpen(false)} />
                    </div>
                    <div className="modal-options">
                        <button>Share your thoughts on cards</button>
                        <button>Ask the community</button>
                    </div>
                </div>
            )}
            
            {isMenuOpen && (
                <div className="popup-modal menu-modal">
                    <div className="modal-header">
                        <h3>Actions</h3>
                        <FiX className="close-icon" onClick={() => setIsMenuOpen(false)} />
                    </div>
                    <div className="modal-options">
                        <button><FiUsers /> Join</button>
                        <button><FiRepeat /> Move</button>
                        <button><FiCopy /> Copy</button>
                        <button><FiSquare /> Mirror</button>
                        <button><FiCheckSquare /> Make template</button>
                        <button><FiEye /> Watch</button>
                        <hr />
                        <button><FiShare2 /> Share</button>
                        <button><FiArchive /> Archive</button>
                    </div>
                </div>
            )}
            
            {isAddMenuOpen && (
                <div className="popup-modal add-modal">
                    <div className="modal-header">
                        <h3>Add to card</h3>
                        <FiX className="close-icon" onClick={() => setIsAddMenuOpen(false)} />
                    </div>
                    <div className="modal-options">
                        <button onClick={handleLabelsClick}><FiTag /> Labels</button>
                        <button><FiCalendar /> Dates</button>
                        <button><FiCheckSquare /> Checklist</button>
                        <button><FiUser /> Members</button>
                        <button><FiPaperclip /> Attachments</button>
                        <button><FiPlus /> Custom Fields</button>
                    </div>
                </div>
            )}

            {isLabelsOpen && (
                <div className="popup-modal labels-modal">
                    <div className="modal-header">
                        <h3>Labels</h3>
                        <FiX className="close-icon" onClick={() => setIsLabelsOpen(false)} />
                    </div>
                    <div className="label-search">
                        <FiSearch />
                        <input type="text" placeholder="Search labels..." />
                    </div>
                    <div className="label-list">
                        {labels.map(color => (
                            <div className="label-option" key={color}>
                                <FiSquare className={`label-color ${color.toLowerCase()}`} />
                                <span className="label-text">{color}</span>
                                <FiEdit2 className="edit-icon" />
                            </div>
                        ))}
                    </div>
                    <div className="modal-actions">
                        <button className="create-label-btn">Create a new label</button>
                        <button className="colorblind-btn">Enable colorblind friendly mode</button>
                    </div>
                </div>
            )}

            {isCoverOpen && (
                <div className="popup-modal cover-modal">
                    <div className="modal-header">
                        <h3>Cover</h3>
                        <FiX className="close-icon" onClick={() => setIsCoverOpen(false)} />
                    </div>
                    <div className="cover-options">
                        <h4>Size</h4>
                        <div className="size-options">
                            <div className="size-preview small"></div>
                            <div className="size-preview large"></div>
                        </div>
                        <h4>Colors</h4>
                        <div className="color-palette">
                            {["green", "yellow", "orange", "red", "purple", "blue", "teal", "pink", "gray"].map(color => (
                                <div className={`color-box ${color}`} key={color}></div>
                            ))}
                        </div>
                        <button className="colorblind-btn">Enable colorblind friendly mode</button>
                        <hr />
                        <h4>Attachments</h4>
                        <button className="upload-btn">Upload a cover image</button>
                        <p className="upload-tip">Tip: Drag an image on to the card to upload it.</p>
                        <h4>Photos from Unsplash</h4>
                        <div className="unsplash-photos">
                            {images.map((img, index) => (
                                <img src={img} alt={`unsplash-img-${index}`} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Wrapper>
    );
};

export default CardDetailPage;