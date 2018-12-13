#Budget Tracker
# CS546_Final_Project


## Summary

**Budget Tracker** is a practical budget and goal tracking app used for money management. It offers different visual tools that can help users understand where they are spending most of their money, where they should be saving and where they can be spending more money. It will allow users to input customized goals for certain spending limitations in specific spending categories. Once users input their receipt information, this data will be paralled with their inputted goals to return their spending habits results. With this Bugdet Tracking tool, users can create budgets, set spending goals, and store information about purchases.


## About the Developers

This budget tracking tool was created by Shane Lynes, Caroline Squillante and Shayna McCarthy. Shane is a Sneior graduating in May with an Engineering Degree in Computer Engineering, Caroline will be graduating in May with an Engineering Degree in Computer Science, and Shayna will also be graduating in May with an Engineering Degree in Computer Engineering. 

## Technologies

**Tech Stack:**

- HTML
- CSS
- Javascript
- JQuery
- AJAX
- JSON
- Bootstrap

#### change this 

Spent is an app built on a Flask server with a PostgreSQL database, with SQLAlchemy as the ORM. The front end templating uses Jinja2, the HTML was built using Bootstrap, and the Javascript uses JQuery and AJAX to interact with the backend. The graphs are rendered using Chart.js. The map is built using the Google Maps API, which works in tandem with the Shippo package tracking API. Server routes are tested using the Python unittest module.


## Features

![alt text](https://github.com/emilydowgialo/Spent/blob/master/static/spent-login-screenshot.png "Spent Login")


The interactive dashboard features graphs, which segment the user’s expenditures into categories, and auto-updating widgets, which illustrate spending metrics and statistics. The user enters budgets for categories along with a date range that is used to display spending stats over that particular time period.

The bar graph and the donut chart show stats based on the user's spending habits within the last 30 days. The bar graph shows the average amount spent per category, while the donut chart displays the total amount spent.


![alt text](https://github.com/emilydowgialo/Spent/blob/master/static/spent-dashboard-screenshot.png "Spent dashboard")

The Budget Remaining widget's progress bars graphically represent the remaining money in the user's budget. Two more widgets display the average and total amounts spent per category within the specified date range. Everything on the dashboard updates in real time as the user adds a new budget or a new expenditure.


![alt text](https://github.com/emilydowgialo/Spent/blob/master/static/spent-widget-screenshot.png "Spent widgets")


Spent's dynamic package tracking feature monitors online purchases, which displays the last place a package was scanned, its delivery status, and plots its current location on a map. When the user saves a new purchase, they are given the option to input tracking information. If the user has tracking information saved, a paper airplane icon is displayed next to the corresponding purchase, and the user simply has to click on the icon to track their package.


![alt text](https://github.com/emilydowgialo/Spent/blob/master/static/spent-map-screenshot.png "Spent package track")


Spent is a one-page dashboard. There is beauty and functionality in simplicity, and the user's flow is kept direct and clean. The user inputs budget and expenditure information in modal window forms that do not take them away from the main dashboard, keeping the user experience focused.


![alt text](https://github.com/emilydowgialo/Spent/blob/master/static/spent-modal-screenshot.png "Spent modals")


## For Version 2.0

- **Search Bar Feature:** Ability to use a searching tool to find past charges based on the place or date of the purchase
- **Search/Sort Feature:** Ability to searching by/sort by using any of the following but not limited to: time range, venue, and amount
- **Alert Feature:** Ability to receive alerts to tell users when he/she is spending too much money in one category or they have more funds available for another category of spending. 

