import React, { useState } from 'react';

import {
  BoardContainer,
  Header,
  Title,
  ButtonGroup,
  HeaderButton,
  ListWrapper,
  List,
  ListHeader,
  ListTitle,
  ThreeDot,
  Menu,
  TaskCard,
  AddTaskBtn,
  CreateListBtn,
  SlideInPanel,
  CenteredModal,
  Overlay,
  Input,
} from './style';


const HomePage = () => {
  const [lists, setLists] = useState([
    { id: 'today', title: 'today', tasks: [], showMenu: false },
    { id: 'week', title: 'this week', tasks: [{ id: 'task-1', content: 'task 1' }], showMenu: false }
  ]);
  const [inboxTasks, setInboxTasks] = useState([
    // Example: { id: 'inbox-1', content: 'Sample inbox task' }
  ]);
  const [slideIn, setSlideIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', members: '', dueDate: '', priority: '' });
  const [addTarget, setAddTarget] = useState('inbox'); // 'inbox' or list id

  const toggleMenu = (id) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, showMenu: !list.showMenu } : { ...list, showMenu: false }
      )
    );
  };

  return (
    <BoardContainer>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo removed */}
          <Title>board title</Title>
        </div>
        <ButtonGroup>
          <HeaderButton>About</HeaderButton>
          <HeaderButton>Share</HeaderButton>
          <HeaderButton>Profile</HeaderButton>
        </ButtonGroup>
      </Header>
      <ListWrapper>
        {/* Inbox column styled like others */}
        <List>
          <ListHeader>
            <ListTitle>inbox</ListTitle>
          </ListHeader>
          {inboxTasks.map((task) => (
            <TaskCard key={task.id}>{task.content}</TaskCard>
          ))}
          <AddTaskBtn onClick={() => { setAddTarget('inbox'); setSlideIn(true); }}>+ add task</AddTaskBtn>
        </List>

        {lists.map((list) => (
          <List key={list.id}>
            <ListHeader>
              <ListTitle>{list.title}</ListTitle>
              <ThreeDot onClick={() => toggleMenu(list.id)}>
                &#x22EE;
              </ThreeDot>
              {list.showMenu && (
                <Menu>
                  <div>rename</div>
                  <div>delete</div>
                  <div>move</div>
                  <div>view</div>
                </Menu>
              )}
            </ListHeader>
            {list.tasks.map((task) => (
              <TaskCard key={task.id}>{task.content}</TaskCard>
            ))}
            <AddTaskBtn onClick={() => { setAddTarget(list.id); setSlideIn(true); }}>+ add task</AddTaskBtn>
          </List>
        ))}
      </ListWrapper>
      {/* Only show Create List button if panel is not open */}
      {!slideIn && (
        <CreateListBtn
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 1000
          }}
          onClick={() => setModalOpen(true)}
        >
          + create list
        </CreateListBtn>
      )}
      {slideIn && (
        <>
          <Overlay onClick={() => setSlideIn(false)} />
          <SlideInPanel>
            <h3>New Task</h3>
            <Input placeholder="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
            <Input placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
            <Input placeholder="Members" value={newTask.members} onChange={e => setNewTask({ ...newTask, members: e.target.value })} />
            <Input placeholder="Due Date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
            <Input placeholder="Priority" value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                style={{ padding: '8px 20px', borderRadius: '4px', border: 'none', background: '#eee', cursor: 'pointer' }}
                onClick={() => setSlideIn(false)}
              >
                Cancel
              </button>
              <button
                style={{ padding: '8px 20px', borderRadius: '4px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}
                onClick={() => {
                  if (!newTask.title.trim()) return;
                  if (addTarget === 'inbox') {
                    setInboxTasks(tasks => [...tasks, { id: 'inbox-' + (tasks.length + 1), content: newTask.title }]);
                  } else {
                    setLists(lists => lists.map(list =>
                      list.id === addTarget
                        ? { ...list, tasks: [...list.tasks, { id: `${addTarget}-task-${list.tasks.length + 1}`, content: newTask.title }] }
                        : list
                    ));
                  }
                  setNewTask({ title: '', description: '', members: '', dueDate: '', priority: '' });
                  setSlideIn(false);
                }}
              >
                Add
              </button>
            </div>
          </SlideInPanel>
        </>
      )}
      {modalOpen && (
        <>
          <Overlay onClick={() => setModalOpen(false)} />
          <CenteredModal>
            <h3>Create New List</h3>
            <Input placeholder="Title" />
            <Input placeholder="Due Date" />
            <Input placeholder="Members" />
            <Input placeholder="Priority" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                style={{ padding: '8px 20px', borderRadius: '4px', border: 'none', background: '#eee', cursor: 'pointer' }}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                style={{ padding: '8px 20px', borderRadius: '4px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}
                // onClick={handleAddList} // Hook up your add handler here
              >
                Add
              </button>
            </div>
          </CenteredModal>
        </>
      )}
    </BoardContainer>
  );
};

export default HomePage;