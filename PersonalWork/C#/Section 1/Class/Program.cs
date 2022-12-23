

using System;
using System.Collections.Generic;

namespace Classes
{
    //Constructors

    class Program
    {
        static void Main(string[] args)
        {

            var customer = new Customer();
            customer.Id = 1;
            customer.Name = "John";


            var order = new Order();
            customer.Orders.Add(order);

            Console.WriteLine(customer.Id);
            Console.WriteLine(customer.Name);
            
        }
    }
}


        //Classes 

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

