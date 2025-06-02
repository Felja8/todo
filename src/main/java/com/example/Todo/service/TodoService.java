package com.example.Todo.service;



import com.example.Todo.model.Todo;
import com.example.Todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }

    public void deleteById(Long id) {
        todoRepository.deleteById(id);
    }

    public Todo setCompleted(Long id, boolean completed) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setCompleted(completed);
                    return todoRepository.save(todo);
                })
                .orElseThrow(() -> new IllegalArgumentException("Todo not found: " + id));
    }
}