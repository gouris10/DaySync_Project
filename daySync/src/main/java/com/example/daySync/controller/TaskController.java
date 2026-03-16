package com.example.daySync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.daySync.model.Task;
import com.example.daySync.repository.TaskRepository;
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/incomplete")
    public List<Task> getIncompleteTasks(@RequestParam String username){

    return taskRepository.findByCompletedFalseAndUsername(username);

    }

    @GetMapping("/completed")
    public List<Task> getCompletedTasks(@RequestParam String username){

    return taskRepository.findByCompletedTrueAndUsername(username);

    }

    @PostMapping("/add")
    public Task addTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @PutMapping("/complete/{id}")
    public Task completeTask(@PathVariable Long id){

        Task task = taskRepository.findById(id).orElseThrow();

        task.setCompleted(true);

        return taskRepository.save(task);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);
    }
}