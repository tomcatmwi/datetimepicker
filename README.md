A simple and non-fancy date and time selector component for Angular 2+. No popup calendar, no effects, no carnival and fireworks, just plain simple form controls.
Requires Bootstrap!

Use it like any other Angular component:

<datetimepicker></datetimepicker>

By default it offers the current date and a range from 1st January of the current year to 10 years in the future till 31st December. To change the range, use parameters:

<datetimepicker [startYear]="1995" [endYear]="2030"></datetimepicker>

You can set the default date value:

<datetimepicker [selectYear]="2017" [selectMonth]="3" [selectDay]="15"></datetimepicker>

If you want to turn off the buttons which allow you to step one day forward or backward:

<datetimepicker [noButton]="true"></datetimepicker>

The component is mobile ready. The buttons will automatically disappear if the screen width is lower than 600px. Modify the css file to change this behavior.

To read the current value, you can either use the (change) event:

<datetimepicker (change)="doSomething($event.date);"></datetimepicker>

or you can use the component as a regular form element in a FormBuilder form:

this.formName = _fb.group({
  birthdate: [new Date(1975, 0, 1)]
});

Currently it only sets dates, not time. Why have I named it a DateTimePicker then? Guess I'm not flawless.
