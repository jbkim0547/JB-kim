
using System;

namespace Inheritance
{
    public class PresentationObject
    {
        public int Width { get; set; }
        public int Height { get; set; }


        public void Copy()
        {
            Console.WriteLine("Object copied to clipboard fdfdf");
        }

        public void Duplicate()
        {
            Console.WriteLine("Object was duplicated");
        }
    }
}


//var text = new Text();
//text.Width = 100;
//text.Copy();
