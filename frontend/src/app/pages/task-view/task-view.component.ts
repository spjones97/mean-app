import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  
  lists: List[] = [];
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.taskService.getLists()
      .subscribe((lists: any) => this.lists = lists);
    
    this.route.params.subscribe((params: any) => {
      const listId = params.listId;

      if (!listId) return;

      this.taskService.getTasks(listId).subscribe((tasks: any) => this.tasks = tasks);
    })
  }

}
