import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'datetimepicker',
  templateUrl: './datetimepicker.component.html',
  inputs: ['startYear', 'endYear', 'noButton'],
  outputs: ['change'],
  styleUrls: ['./datepicker.component.css'],  
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DateTimePickerComponent),
          multi: true
      }
  ]
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {

    startYear;
    endYear;
    selectYear;
    selectMonth;
    selectDay;
    noButton = false;
    value;
    
    months = [];
    years = [];
    days = [];
    
    change = new EventEmitter();
    
    onChange: any = () => { };
    onTouched: any = () => { };
    
//  register form element events
    registerOnChange(fn) {
        this.onChange = fn;
        this.onChange(this.calcDate());
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    
    writeValue(date) {
//  gets a Date object and sets the controls accordingly        
        if (date instanceof Date) {
            this.selectYear = date.getFullYear();
            this.selectMonth = date.getMonth()+1;
            this.selectDay = date.getDate();
            this.updateDays(this.selectYear, this.selectMonth);
        }
    };
    
    calcDate() {
//  calculates a Date object from all the values        
        var temp = new Date;
        temp.setFullYear(this.selectYear);
        temp.setMonth(this.selectMonth - 1);
        temp.setDate(this.selectDay);
        temp.setHours(0);
        temp.setMinutes(0);
        temp.setSeconds(0);
        return temp;
    }
    
//  outputs the current event to the 'change' event
    dateChange() {
        this.change.emit({ date: this.calcDate() });
    }    

    ngOnInit() {
        
        var today = new Date();

//  set year range
//  if startYear, endYear or currentYear not specified or <1900, set it as current year
        
        this.years = [];
        if (isNaN(this.startYear) || this.startYear < 1900 || this.startYear > 2100) this.startYear = today.getFullYear();
        if (isNaN(this.endYear) || this.endYear < 1900 || this.endYear > 2100) this.endYear = today.getFullYear();
        if (isNaN(this.selectYear) || this.selectYear < 1900 || this.selectYear > 2100) this.selectYear = today.getFullYear();

//  swap startYear and endYear of necessary
//  set distance if they are the same                        
        if (this.startYear > this.endYear) [this.startYear, this.endYear] = [this.endYear, this.startYear];
        if (this.startYear == this.endYear) { this.startYear -= 10; this.endYear += 10; }
        for (var t=this.startYear; t<=this.endYear; t++) this.years.push(t);

//  set selected month to current if invalid month was specified
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (isNaN(this.selectMonth) || this.selectMonth < 1 || this.selectMonth > 12) this.selectMonth = today.getMonth()+1;

        if (isNaN(this.selectDay) || this.selectDay < 1 || this.selectDay > 31) this.selectDay = today.getDate();
        
        this.updateDays(this.selectYear, this.selectMonth);
    }
    
    updateDays(year, month) {

//  calculates proper number of days
        var maxdays = 31;
        if (month == 4 || month == 6 || month == 9 || month == 11) maxdays = 30;
        if (month == 2) {
            if (year % 4 == 0) maxdays = 29 
            else maxdays = 28;
        }
        this.days = [];
        for (var t=1; t<=maxdays; t++) this.days.push(t);
        this.onChange(this.calcDate());
    }
    
    stepdate(days) {
//  steps the date with a number of days forward or backward
        var currentDate = this.calcDate();
        currentDate.setDate(currentDate.getDate() + days);
        if (currentDate.getFullYear() >= this.startYear && currentDate.getFullYear() <= this.endYear)
            this.writeValue(currentDate);
        this.dateChange();
    }
    
}
