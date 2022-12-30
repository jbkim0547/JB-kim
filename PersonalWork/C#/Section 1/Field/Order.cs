namespace Fields
{
    public class Order
    {

    }
}


var customer = new Customer(1);
customer.Orders.Add(new Order());
customer.Orders.Add(new Order());

customer.Promote();

Console.WriteLine(customer.Orders.Count);
