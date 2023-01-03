using System;

namespace Properties
{
    public class Person

  {
        public DateTime Birthdate { get; set; }

        public int Age
        {
            get        
            {                var timeSpan = DateTime.Today - Birthdate;
                var years = timeSpan.Days / 365;

               return years;
            }
        }
    }
}


var person = new Person(new DateTime(1982, 1, 1));
Console.WriteLine(person.Age);
