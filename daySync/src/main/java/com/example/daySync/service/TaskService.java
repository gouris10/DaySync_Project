package com.example.daySync.service;

import com.example.daySync.model.Task;
import com.example.daySync.repository.TaskRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

private final TaskRepository repo;

public TaskService(TaskRepository repo){
this.repo = repo;
}

/* ADD TASK */

public Task addTask(Task task){
return repo.save(task);
}

/* INCOMPLETE TASKS FOR USER */

public List<Task> getIncompleteTasks(String username){
return repo.findByCompletedFalseAndUsername(username);
}

/* COMPLETED TASKS FOR USER */

public List<Task> getCompletedTasks(String username){
return repo.findByCompletedTrueAndUsername(username);
}

/* TODAY TASKS FOR USER */

public List<Task> getTodayTasks(String username){

List<Task> tasks = repo.findByCompletedFalseAndUsername(username);

return tasks.stream()
.filter(task -> LocalDate.now().equals(task.getDueDate()))
.toList();
}

/* COMPLETE TASK */

public Task completeTask(Long id){

Task task = repo.findById(id).orElseThrow();

task.setCompleted(true);

return repo.save(task);
}

/* DELETE TASK */

public void deleteTask(Long id){
repo.deleteById(id);
}

}