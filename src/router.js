
// - `id` - Identificador único de cada task
// - `title` - Título da task
// - `description` - Descrição detalhada da task
// - `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
// - `created_at` - Data de quando a task foi criada.
// - `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

// Array de tasks vai ser criado aqui

let tasks = [];

export const router = (req, res) => {
  const { url, method } = req;

  // Parsing ID from URL when necessary
  const matchTaskId = url.match(/^\/tasks\/(\d+)/);
  const taskId = matchTaskId ? Number(matchTaskId[1]) : null;

  // GET /tasks - List all tasks
  if (method === 'GET' && url === '/tasks') {
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(tasks));
  }

  // POST /tasks - Create a new task
  if (method === 'POST' && url === '/tasks') {
    // create a new task with the request body and add it to the tasks array
   tasks.push({
    id: tasks.length + 1,
    nome: 'Task 1',
    description: 'Task 1 description',

   });
     
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(tasks[tasks.length - 1]));    
  }

  // DELETE /tasks/:id - Delete a task by ID
  if (method === 'DELETE' && taskId !== null) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Task not found');
    }
    tasks.splice(taskIndex, 1);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Task deleted');
  }

  // PUT /tasks/:id - Update a task by ID
  if (method === 'PUT' && taskId !== null) {
    // atualizo dentro do array de tasks a task com o id passado
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Task not found');
    }
    // atualizo de forma fiixa o nome e a descrição da task
    tasks[taskIndex].nome = 'Task 1 updated';
    tasks[taskIndex].description = 'Task 1 description updated';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(tasks[taskIndex]));


  }
  // PATCH /tasks/:id/complete - Mark a task as completed by ID
  if (method === 'PATCH' && taskId !== null && url.endsWith('/complete')) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Task not found');
    }
    tasks[taskIndex].completed_at = new Date().toISOString();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(tasks[taskIndex]));
  }

  // 404 Not Found for any other route
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  return res.end('Not Found');
};
