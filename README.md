# Example Blog App With Custom Admin Panel

### Server Setup

-   Create a virtual environment: python3 -m venv venv
-   Install dependencies: pip install -r requirements.txt
-   Migrate to database: python manage.py migrate
-   Create admin user: python manage.py createsuperuser
-   Run server: python manage.py runserver

### Client Setup

-   Install dependencies: npm install
-   Run dev server: npm run dev
-   Navigate to: 127.0.0.1:3000

Note: When testing admin panel locally don't use the Chrome browser since this setup stores credentials in cookies that have Same Site as None in order to send cookies cross-origin. When using chrome, it doesn't allow this behavior for localhost. Therefore use either Firefox or Safari when testing locally. The reason is that you need a secure connection with SSL/HTTPS on Chrome in order for cookies with this setting to work, therefore this setup would work on Chrome when in a production environment.
