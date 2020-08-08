Instructions to run:

1) In the app.py, change <Pass> to yout password and change the username if not 
using the default <postgres> user.

2) Initialize the database by logging in to psql and running the command
\i project.sql to initialize the data. If the user is connected to psql
with a different username than <postgres>, change the lines 51-55 in project.sql
to grant access to your username instead of <postgres>.

3) Change the absolute path on line 58 to point to where you stored the tanzania_NFB.csv

4) flask run and enjoy!