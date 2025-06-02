// src/main/java/com/example/todoapp/web/TodoController.java
package com.example.Todo.web;

import com.example.Todo.model.Todo;
import com.example.Todo.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getAll() {
        return todoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getOne(@PathVariable Long id) {
        return todoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody Todo todo) {
        Todo saved = todoService.save(todo);
        // Return 201 Created with Location header pointing to new resource
        return ResponseEntity
                .created(URI.create("/api/todos/" + saved.getId()))
                .body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo todo) {
        if (!todoService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        todo.setId(id);
        Todo updated = todoService.save(todo);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggleComplete(@PathVariable Long id) {
        return ResponseEntity.ok(
                todoService.setCompleted(id,
                        todoService.findById(id)
                                .map(Todo::isCompleted)
                                .map(c -> !c)
                                .orElseThrow(() -> new IllegalArgumentException("Todo not found: " + id)))
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!todoService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        todoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}