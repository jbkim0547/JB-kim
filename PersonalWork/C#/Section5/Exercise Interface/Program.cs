using Excercise_Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Excercise_Interface
{

    public class Program
    {
        static void Main(string[] args)
        {
            Workflow workflow = new Workflow();
            workflow.Add(new VideoUploader());
            workflow.Add(new SendEmail());
            workflow.Add(new ChangeStatus());

            var engine = new WorkFlowEngine();
            engine.Run(workflow);

            Console.ReadLine();

        }
    }

    public interface ITask
    {
        void Execute();
    }

    public interface IWorkFlow
    {
        void Add(ITask task);
        void Remove(ITask task);
        IEnumerable<ITask> GetTasks();
    }

    public class Workflow : IWorkFlow
    {

        private readonly List<ITask> _tasks;

        public Workflow()
        {
            _tasks = new List<ITask>();
        }

        public void Add(ITask task)
        {
            _tasks.Add(task);
        }

        public void Remove(ITask task)
        {
            _tasks.Remove(task);
        }

        public IEnumerable<ITask> GetTasks()
        {
            
            return _tasks;
        }
    }

    class VideoUploader : ITask
    {
        public void Execute()
        {
            Console.WriteLine("Uploading a Video");
        }
    }

    class SendEmail : ITask
    {
        public void Execute()
        {
            Console.WriteLine("Sending a Email");
        }
    }

    class ChangeStatus : ITask
    {
        public void Execute()
        {
            Console.WriteLine("Status changed");
        }
    }
    public class WorkFlowEngine
    {

        public void Run(IWorkFlow workFlow)
        {
            foreach (ITask I in workFlow.GetTasks())
            {
                I.Execute();
            }
        }
    }
}


