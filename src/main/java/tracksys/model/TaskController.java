package tracksys.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/task")
public class TaskController {

	
	
	
	@Autowired
	private TaskRepository taskRepository;
	
	@RequestMapping(value ="/findAll",method = RequestMethod.GET)
	public @ResponseBody Iterable<Task> findAll() {
		return taskRepository.findAll();
	}		
	
	@RequestMapping(value ="/create",method = RequestMethod.POST)
	public @ResponseBody Task  create(@RequestBody Task task) {
		return taskRepository.save(task);
	}
}
