import React, { useState } from 'react';
import Wrapper from './style.js';

// Main HomePage component
const HomePage = () => {
  // State to manage the lists and their tasks
  const [lists, setLists] = useState([
    {
      id: 'list-today',
      title: 'today',
      tasks: [
        { id: 'task-1', content: 'Example Task 1' },
        { id: 'task-2', content: 'Another Task' },
      ],
    },
    {
      id: 'list-this-week',
      title: 'this week',
      tasks: [
        { id: 'task-3', content: 'Task for this week' },
      ],
    },
  ]);

  // State to control the visibility of the Add Task Modal
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  // State to store which list the task is being added to (optional, but useful)
  const [currentListId, setCurrentListId] = useState(null);

  // Dummy function for button clicks (for general actions)
  const handleClick = (action, item = '') => {
    console.log(`${action} clicked for ${item}`);
    // In a real app, this would trigger state updates, API calls, etc.
  };

  // Function to open the Add Task Modal for a specific list
  const handleAddTaskClick = (listId) => {
    setCurrentListId(listId); // Set the target list for the new task
    setShowAddTaskModal(true);
  };

  // Function to handle adding a new task from the modal
  const handleAddTask = (newTask) => {
    console.log('Adding new task:', newTask, 'to list:', currentListId);
    // In a real application, you would update the 'lists' state here
    // For now, we'll just log it and close the modal.

    // Example of how you might add the task to the state:
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === currentListId
          ? { ...list, tasks: [...list.tasks, { id: `task-${Date.now()}`, content: newTask.title }] }
          : list
      )
    );

    setShowAddTaskModal(false);
    setCurrentListId(null); // Reset current list ID
  };

  return (
    <Wrapper>
      <div className="kanban-app-container">
        {/* Sidebar Component */}
        <Sidebar handleClick={handleClick} handleAddTaskClick={() => handleAddTaskClick('list-inbox')} />

        {/* Main content area */}
        <div className="kanban-main">
          {/* Header Component */}
          <Header boardTitle="board tittle" handleClick={handleClick} />

          {/* Kanban Board Component */}
          <KanbanBoard lists={lists} handleClick={handleClick} handleAddTaskClick={handleAddTaskClick} />
        </div>

        {/* Add Task Modal - Conditionally rendered */}
        {showAddTaskModal && (
          <AddTaskModal
            onClose={() => setShowAddTaskModal(false)}
            onAddTask={handleAddTask}
          />
        )}
      </div>
    </Wrapper>
  );
};

// Sidebar Component
const Sidebar = ({ handleClick, handleAddTaskClick }) => {
  return (
    <div className="kanban-sidebar w-64 p-6 shadow-md flex flex-col rounded-r-lg">
      {/* Logo Placeholder */}
      <div className="kanban-logo w-14 h-14 text-lg font-bold rounded-lg mb-8 shadow-inner flex items-center justify-center">
        AP
      </div>

      {/* Inbox Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">inbox</h2>
        <ActionButton text="add task" onClick={handleAddTaskClick} /> {/* Use handleAddTaskClick here */}
      </div>

      {/* Placeholder for other sidebar items */}
      <div className="flex-1">
        {/* You can add more navigation links or sections here */}
      </div>

      {/* User Profile/Settings Placeholder */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          className="flex items-center justify-center w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          onClick={() => handleClick('User Profile')}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          My Profile
        </button>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ boardTitle, handleClick }) => {
  const [showBoardMenu, setShowBoardMenu] = useState(false);

  return (
    <header className="kanban-header flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
      <div className="flex items-center relative">
        <h1 className="kanban-header-title text-3xl font-extrabold text-gray-900 mr-2">{boardTitle}</h1>
        <button
          className="text-gray-500 hover:text-gray-700 text-4xl leading-none pb-2 focus:outline-none"
          onClick={() => setShowBoardMenu(!showBoardMenu)}
          aria-label="Board options"
        >
          &hellip;
        </button>
        {showBoardMenu && (
          <DropdownMenu
            options={['Rename Board', 'Delete Board', 'Archive Board']}
            onSelect={(option) => {
              handleClick(option, 'Board');
              setShowBoardMenu(false);
            }}
            positionClasses="top-full left-0 mt-2"
          />
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Chat Icon */}
        <button
          className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => handleClick('Chat')}
          aria-label="Open chat"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9H7v2h2V9z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Share Button */}
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          onClick={() => handleClick('Share')}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Share
        </button>

        {/* User Icon */}
        <button
          className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => handleClick('User Profile')}
          aria-label="User profile"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </header>
  );
};

// Kanban Board Component
const KanbanBoard = ({ lists, handleClick, handleAddTaskClick }) => {
  return (
    <div className="kanban-board flex flex-grow space-x-6 overflow-x-auto pb-4">
      {lists.map((list) => (
        <TaskList key={list.id} list={list} handleClick={handleClick} handleAddTaskClick={() => handleAddTaskClick(list.id)} />
      ))}

      {/* Create New List Button */}
      <div className="flex-shrink-0 w-72 p-4">
        {/* Modified ActionButton for 'create list' */}
        <ActionButton
          text="create list"
          onClick={() => handleClick('Create List')}
          isPrimary={true} // Add a prop to indicate primary styling
        />
      </div>
    </div>
  );
};

// Task List Component
const TaskList = ({ list, handleClick, handleAddTaskClick }) => {
  const [showListMenu, setShowListMenu] = useState(false);

  // Options for the list dropdown menu
  const listMenuOptions = [
    'Add card',
    'Copy list',
    'Move list',
    'Delete all cards in this list',
    'Sort by...',
    'Watch',
    '---', // Separator
    'Rename list',
    'Delete list',
    'Change background color',
  ];

  return (
    <div className="kanban-list flex-shrink-0 w-72 bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4 relative">
        <h3 className="kanban-list-title text-lg font-semibold text-gray-800">{list.title}</h3>
        {/* Ellipsis button for list options */}
        <button
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none pb-1 focus:outline-none"
          onClick={() => setShowListMenu(!showListMenu)}
          aria-label="List options"
        >
          &hellip;
        </button>
        {showListMenu && (
          <DropdownMenu
            options={listMenuOptions}
            onSelect={(option) => {
              handleClick(option, list.title);
              setShowListMenu(false);
            }}
            positionClasses="top-full right-0 mt-2"
          />
        )}
      </div>

      {/* Render task cards for regular lists */}
      <div className="flex-1 overflow-y-auto pr-2 -mr-2"> {/* Added scroll for tasks if many */}
        {list.tasks.map((task) => (
          <TaskCard key={task.id} task={task} handleClick={handleClick} />
        ))}
      </div>

      {/* Add Task Button */}
      <div className="mt-4">
        <ActionButton text="add task" onClick={handleAddTaskClick} />
      </div>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task, handleClick }) => {
  const [showTaskMenu, setShowTaskMenu] = useState(false);

  return (
    <div className="kanban-task-card bg-gray-50 p-3 mb-3 rounded-md shadow-sm border border-gray-200 relative">
      <div className="flex justify-between items-center">
        <p className="text-gray-800 text-sm font-medium">{task.content}</p>
        <button
          className="text-gray-500 hover:text-gray-700 text-xl leading-none pb-1 focus:outline-none"
          onClick={() => setShowTaskMenu(!showTaskMenu)}
          aria-label="Task options"
        >
          &hellip;
        </button>
      </div>
      {showTaskMenu && (
        <DropdownMenu
          options={['Edit Task', 'Delete Task', 'Move Task', 'Assign Task']}
          onSelect={(option) => {
            handleClick(option, task.content);
            setShowTaskMenu(false);
          }}
          positionClasses="top-full right-0 mt-2"
        />
      )}
    </div>
  );
};

// Reusable Action Button Component (e.g., "add task", "create list")
const ActionButton = ({ text, onClick, isPrimary = false }) => {
  const baseClasses = "flex items-center w-full py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 shadow-sm";
  const defaultClasses = "bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-300";
  const primaryClasses = "bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 focus:ring-blue-400 shadow-md";

  return (
    <button
      className={`${baseClasses} ${isPrimary ? primaryClasses : defaultClasses}`}
      onClick={onClick}
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      {text}
    </button>
  );
};

// Reusable Dropdown Menu Component
const DropdownMenu = ({ options, onSelect, positionClasses = '' }) => {
  return (
    <div className={`absolute z-10 bg-white rounded-md shadow-lg py-1 w-48 border border-gray-200 ${positionClasses}`}>
      {options.map((option, index) => (
        option === '---' ? (
          <hr key={`separator-${index}`} className="my-1 border-gray-200" />
        ) : (
          <button
            key={option}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-100 focus:outline-none"
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        )
      ))}
    </div>
  );
};

// New AddTaskModal Component
const AddTaskModal = ({ onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low'); // Default priority
  const [member, setMember] = useState('');

  const handleSave = () => {
    onAddTask({ title, description, dueDate, priority, member });
  };

  // Handle clicks on the overlay to close the modal
  const handleOverlayClick = (e) => {
    // Check if the click target is the modal overlay itself, not a child of the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // Modal Overlay - handles clicks outside the content
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick} // Add onClick handler to the overlay
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>

        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="task-title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="task-description"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Due Date Input */}
          <div>
            <label htmlFor="task-due-date" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="task-due-date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Priority Select */}
          <div>
            <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="task-priority"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Member Input */}
          <div>
            <label htmlFor="task-member" className="block text-sm font-medium text-gray-700 mb-1">
              Member
            </label>
            <input
              type="text"
              id="task-member"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Assign to member"
              value={member}
              onChange={(e) => setMember(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            onClick={handleSave}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
