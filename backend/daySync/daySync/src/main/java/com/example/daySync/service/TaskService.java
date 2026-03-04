package com.example.daySync.service;

import com.example.daySync.model.Task;
import com.example.daySync.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Task addTask(Task task) {
        return repository.save(task);
    }

    public Task toggleTask(Long id) {
        Task task = repository.findById(id).orElseThrow();
        task.setDone(!task.isDone());
        return repository.save(task);
    }

    public void deleteTask(Long id) {
        repository.deleteById(id);
    }
}