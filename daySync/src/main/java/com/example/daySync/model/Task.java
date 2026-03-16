package com.example.daySync.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Task {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String title;

private String description;

private String category;

private String priority;

private LocalDate dueDate;

private Boolean completed = false;

private String username;

public Task(){}

public Long getId(){ return id; }
public void setId(Long id){ this.id = id; }

public String getTitle(){ return title; }
public void setTitle(String title){ this.title = title; }

public String getDescription(){ return description; }
public void setDescription(String description){ this.description = description; }

public String getCategory(){ return category; }
public void setCategory(String category){ this.category = category; }

public String getPriority(){ return priority; }
public void setPriority(String priority){ this.priority = priority; }

public LocalDate getDueDate(){ return dueDate; }
public void setDueDate(LocalDate dueDate){ this.dueDate = dueDate; }

public Boolean getCompleted(){ return completed; }
public void setCompleted(Boolean completed){ this.completed = completed; }

public String getUsername(){ return username; }
public void setUsername(String username){ this.username = username; }

}