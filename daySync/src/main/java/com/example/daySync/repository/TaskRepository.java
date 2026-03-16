package com.example.daySync.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.daySync.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

List<Task> findByCompletedFalseAndUsername(String username);

List<Task> findByCompletedTrueAndUsername(String username);

}