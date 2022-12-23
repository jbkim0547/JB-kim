using System.Collections.Generic;

namespace Classes
{
    public class Customer
    {
        public int Id;
        public string Name;
        public List<Order> Orders;

        public Customer()
        {
            Orders = new List<Order>();
        }

        public Customer(int id)
            :this()
        {
            this.Id = id;
        }

        public Customer(int id, string name) 
            :this(id)
        {
            this.Name = name;
        }
    }
}


//namespace Classes
//{
//    public class Person
//    {
//        public string Name;

//        public void Introduce(string to)
//        {
//            Console.WriteLine("Hi {0}, I am {1}", to, Name);
//        }

//        public static Person Parse(string str)
//        {
//            var person = new Person();
//            person.Name = str;

//            return person;
//        }
//    }
//    class Program
//    {
//        static void Main(string[] args)
//        {

//            var person = Person.Parse("John");
//            person.Introduce("Mosh");
//        }
//    }
//}

