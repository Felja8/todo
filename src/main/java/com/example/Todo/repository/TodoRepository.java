package com.example.Todo.repository;


import com.example.Todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByCompletedFalse();

    List<Todo> findByCompletedTrue();

    List<Todo> findByTitleContainingIgnoreCase(String keyword);

    long deleteByCompletedTrue();
}