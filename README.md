## 💭 Reflection

### Challenges Faced
 
The most significant challenge was implementing the **automatic overdue detection system**. Initially, I struggled with date comparisons because JavaScript dates include time components, causing inconsistent results. For example, a task due "today" might be marked overdue if checked in the afternoon because the time was set to midnight.

Another challenge was managing the **filter state** while keeping the display synchronized. When users applied multiple filters (both status and category), ensuring the correct tasks displayed required careful state management and proper filter logic sequencing.

**LocalStorage integration** also presented hurdles, particularly with data type conversions. Understanding when to use `JSON.stringify()` and `JSON.parse()` was crucial, as localStorage only accepts strings.


### How I Solved These Challenges

For the **date comparison issue**, I researched JavaScript's Date object methods and discovered `setHours(0, 0, 0, 0)` to normalize dates to midnight. This ensured fair day-to-day comparisons without time interference.

For **filter management**, I implemented separate state variables (`currentStatusFilter` and `currentCategoryFilter`) and applied filters sequentially in the `displayTasks()` function. This approach maintained filter independence while allowing them to work together.

I addressed **localStorage challenges** by adding extensive `console.log()` statements during development to visualize data transformations, helping me understand the stringify/parse cycle.


### Future Improvements

Given more time, I would implement:

1. **Task Editing** - Allow users to modify task details after creation
2. **Priority Levels** - Add high/medium/low priority with visual indicators
3. **Search Functionality** - Search tasks by keywords

<p align='center'>Made by Yeroc with <img src="javascript-ES6+-yellow.svg" width="50" height="10" alt="js svg" align="center"</p>
