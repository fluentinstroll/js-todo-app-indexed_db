import Database from "./database/database";

document.addEventListener("DOMContentLoaded", () => {
  const database = new Database("DBTasks", 1, "title, description");
  const form = document.querySelector("form");
  const tasksContainer = document.querySelector("#task-container");
  form.addEventListener("submit", saveTask);

  function saveTask(event) {
    event.preventDefault();
    const title = document.querySelector("#itTitle").value;
    const description = document.querySelector("#itDescription").value;
    const task = {title, description};
    const transaction = database.persist(task, () => form.reset());
    transaction.oncomplete = () => {
      console.log("Task added successfully!");
    }
  }

  function showTasks() {
    // Leave the div empty
    while (tasksContainer.firstChild) tasksContainer.removeChild(tasksContainer.firstChild);
    const request = database.getOpenCursor();
    request.onsuccess = event => {
      const cursor = event.target.result;
      if (cursor) {
        const {title, description} = cursor.value;
        // Advance to the next record
        cursor.continue();
      } else {
        // There is no data or we have come to the end of the table
      }
    }
  }
});