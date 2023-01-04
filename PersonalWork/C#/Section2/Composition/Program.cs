
using Composition;

namespace Composition
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbMigratior = new DbMigrator(new Logger());

            var logger = new Logger();
            var installer = new Installer(logger);

            dbMigratior.Migrate();
            installer.Install();
        }
    }
}
