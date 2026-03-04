package com.example.daySync.repository;

import com.example.daySync.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCategory(String category);
    List<Task> findByIsDone(boolean isDone);
}