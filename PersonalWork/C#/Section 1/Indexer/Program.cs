
using System;
using System.Diagnostics;
using System.Reflection;
using System.Threading;

namespace Indexers
{


    public class StopWatch
    {

        private static bool _timerOn = false;
        private static DateTime _startTime;
        private static DateTime _stopTime;


        public static void Start()
        {
            if(_timerOn == true)
            {
                throw new InvalidOperationException("Stopwatch is already running");
            }

            _timerOn = true;
            _startTime = DateTime.Now;

        }

        public static TimeSpan Stop()
        {
            if(_timerOn == false)
            {
                throw new InvalidOperationException("Stopwatch is already stopped");
            }

            _timerOn = false;
            _stopTime = DateTime.Now;

            return   _stopTime - _startTime;
        }
    }
    class Program
    {

        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("start/stop/exit: ");
                var userInput = Console.ReadLine().ToLower();

                if (userInput == "exit")
                    break;
                else if (userInput == "start") {
                    StopWatch.Start();
                    Console.WriteLine("stopWatch is running");
                }
                else if (userInput == "stop")
                {
                    var elaspsedTime = StopWatch.Stop();
                    Console.WriteLine($"elaspsedTime = {elaspsedTime}");
                } else
                {
                    Console.WriteLine($"Your Input: {userInput} is not valid");
                }
                    

            }
            
        }
    }

    
}


//var cookie = new HttpCookie();
//cookie["name"] = "Mosh";
//Console.WriteLine(cookie["name"]);
