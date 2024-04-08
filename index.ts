import inquirer from "inquirer";
import chalk from "chalk";
let todoList: string[] = [];
let condition = true;
console.log(chalk.yellow("\n\tWelcome to your To-Do list."))
let main = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.magentaBright("select an option"),
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View To-Do List",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addtask();
    } else if (option.choice === "Delete Task") {
      await deletetask();
    } else if (option.choice=== "Update Task") {
      await updatetask();
    } else if (option.choice === "View To-Do List") {
      await viewtask();
    } else if (option.choice === "Exit") {
      condition = false;
      console.log(chalk.rgb(255, 202, 212)("Thankyou for visiting our app!"));
    }
  }
};

// ADD TASK
let addtask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.blackBright("Enter the task you want to add:")
  
      }
  ]);if(newTask.task==""){console.log(chalk.redBright("Please enter a valid task."))}
  else {
  todoList.push(newTask.task);
  console.log(
    chalk.greenBright(`\n"${newTask.task}" Task added successfully in the To-Do list`)
  )};
  console.log(todoList)
}
// VIEW TASK
let viewtask = () => {
  console.log(chalk.cyan("\nYour To-Do list.\n"));
  todoList.forEach((task, index) => {
    console.log(chalk.magenta(`${index + 1}: ${task}`));
  })
  
 }

// DELETE TASK
let deletetask = async () => {
  await viewtask();
  let TaskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.blackBright("Enter the index number you want to delete."),
    }
  ]);
  let deletetask = todoList.splice(TaskIndex.index - 1, 1);
  console.log(
    chalk.green(
      `Task ${deletetask} has been deleted successfully [you can check this from view list.]`
    )
  )
}
//   UPDATE TASK
let updatetask = async () => {
  await viewtask();
  let update_task = await inquirer.prompt([
    {
      name: "index",
      type: "Number",
      Message: "Enter the index number you want to update.",
    },
    {
      name: "new_task",
      type: "input",
      message: chalk.blue("Enter the updated task:"),
    },
  ]);
  todoList[update_task.index - 1] = update_task.new_task;
  console.log(
    chalk.greenBright(
      `\n Task "${update_task.index}" is updated successfully [you can check this from view list.]`
    )
  )
}
main();
