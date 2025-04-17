package com.example.demo;

import com.example.demo.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*; // 👈 Fixed import
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @Test
    void testCreateTask() throws Exception {
        System.out.println("==== STARTING TEST ====");
        Task task = new Task();
        task.setText("Test Task");

        // Now "post()" will resolve correctly!
        String response = mockMvc.perform(post("/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(task)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.text").value("Test Task"))
                        .andReturn().getResponse().getContentAsString();
        System.out.println("TEST SUCCESS. Response: " + response);
    }
}