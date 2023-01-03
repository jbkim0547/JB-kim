
using Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;

namespace Properties
{

    class StackOverFlow
    {
        private List<Post> PostList = new List<Post> ();

        public int AddPost(Post post)
        {
            PostList.Add(post);
            return PostList.Count;

            
        }

        public Post GetPost(int id)
        {
            return PostList [id];
        }

        public int PostCount()
        {
            return PostList.Count;
        }
    }
    
    public class Post
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime _postTime = DateTime.Now;
        private int _voteValue = 0;


        public Post()
        {
            Title = "";
            Description = "";

        }

        public void SetTitle(string title)
        {
            Title = title;
        }

        public DateTime PostTime()
        {
            return _postTime;
        }

        public void SetDescription (string description)
        {
            Description = description;
        }

        public void UpVote()
        {
            _voteValue++;
            if (_voteValue == 0)
                _voteValue++;
        }

        public void DownVote()
        {
            _voteValue--;
            if (_voteValue == 0)
                _voteValue--;
        }

        public int GetVote()
        {
            return _voteValue;
        }

    }


    class Program
    {

        public static void ViewPost(int Id, StackOverFlow service)
        {
            if(service.PostCount() <= Id - 1 || Id == 0)
            {
                Console.Clear();
                Console.WriteLine("Please enter Valid post number");
            }else
            {
                var post = service.GetPost(Id - 1);
                while (true)
                {
                    Console.Clear();
                    Console.WriteLine("Post: {0} vote:{1}", post.Title, post.GetVote());
                    Console.WriteLine("Date Posted " + post.PostTime());
                    Console.WriteLine(post.Description);
                    Console.WriteLine("Enter 'u' to up vote, 'd' to down vote or 'q' to quit.");

                    var input = Console.ReadLine().ToLower();
                    if(input == "q")
                    {
                        Console.Clear();
                        break;
                    } 

                    switch (input)
                    {
                        case "u":
                            post.UpVote();
                            Console.Clear();
                            break;

                        case "d":
                            post.DownVote();
                            Console.Clear();
                            break;
                        default:
                            Console.Clear();
                            break;
                    }
                }
            }
        }

        public static void CreatePost(StackOverFlow service)
        {
            var post = new Post();

            Console.WriteLine("Enter Title: ");
            post.Title = Console.ReadLine();
            Console.WriteLine("Enter Description");
            post.Description = Console.ReadLine();
            Console.Clear();
            service.AddPost(post);
            ViewPost(service.PostCount(), service);
        }

        static void Main(string[] args)
        {
            var service = new StackOverFlow();
            while (true)
            {
                Console.WriteLine("Total current posts: " + service.PostCount());
                Console.WriteLine("Enter the post number to view it, 'n' to create a new post or 'q' to quit");
                var input =Console.ReadLine().ToLower();
                if(input == "q")
                {
                    break;
                } else if (input.All(char.IsDigit))
                {
                    ViewPost(Convert.ToInt32(input), service);
                } else if (input == "n")
                         CreatePost(service);
                        
            }
        }
    }
}


//var person = new Person(new DateTime(1982, 1, 1));
//Console.WriteLine(person.Age);

