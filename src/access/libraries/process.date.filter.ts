import { DateUtil } from '@servicelabsco/nestjs-utility-services';
import {
    addMonths,
    endOfDay,
    endOfQuarter,
    endOfWeek,
    endOfYear,
    startOfDay,
    startOfMonth,
    startOfQuarter,
    startOfWeek,
    startOfYear,
    subDays,
    subMinutes,
    subMonths,
    subQuarters,
    subYears,
} from 'date-fns';
import { DateFilterDto } from '../dtos/date.filter.dto';
import { DateRangeFilterDto } from '../dtos/date.range.filter.dto';

/**
 * this would analyse the date filter and assign the range accordingly
 * @export
 * @class ProcessDateFilter
 */
export class ProcessDateFilter {
    /**
     * this would store the input from the system
     * @private
     * @type {DateFilterDto}
     * @memberof ProcessDateFilter
     */
    private filter: DateFilterDto;

    /**
     * the final range filter against the input filter condition
     * @private
     * @type {DateRangeFilterDto}
     * @memberof ProcessDateFilter
     */
    private range: DateRangeFilterDto;

    /**
     * entry point for the filter condition
     * @return {*}  {DateRangeFilterDto}
     * @memberof ProcessDateFilter
     */
    process(filter: DateFilterDto) {
        if (!filter) return;

        this.filter = filter;
        this.analyseFilter();

        return this.setToTimezone();
    }

    /**
     * convert to the business timezone against the given times
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private setToTimezone() {
        let { min, max } = this.setRangeToDate();

        min = DateUtil.getDateTimeInFormat(subMinutes(min, 330));
        max = DateUtil.getDateTimeInFormat(subMinutes(max, 330));

        return { min, max };
    }

    /**
     * fix convert min and max date range to date
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private setRangeToDate() {
        let { min, max } = this.range as any;
        if (min instanceof Date) return { min, max };

        min = new Date(min);
        max = new Date(max);

        return { min, max };
    }

    /**
     * analyse all the filter condition and get the final copy
     * @private
     * @memberof ProcessDateFilter
     */
    private analyseFilter() {
        if (this.range) return this.range;

        this.today();
        this.yesterday();
        this.week();
        this.lastWeek();
        this.month();
        this.currentQuarter();
        this.previousQuarter();
        this.year();
        this.currentFy();
        this.previousFy();
        this.financialYear();
        this.checkRange();
    }

    /**
     * check if today filter is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private today() {
        if (!this.filter.today) return;

        const today = new Date();

        this.range = { min: startOfDay(today), max: endOfDay(today) };
    }

    /**
     * check if yesterday filter is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private yesterday() {
        if (!this.filter.yesterday) return;
        const now = new Date();
        this.range = { min: startOfDay(subDays(now, 1)), max: endOfDay(subDays(now, 1)) };
    }

    /**
     * check if week filter is being set
     * week starts with monday
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private week() {
        if (!this.filter.week) return;
        const now = new Date();
        this.range = { min: startOfWeek(now, { weekStartsOn: 1 }), max: endOfDay(now) };
    }

    /**
     * check if last_week filter is being set
     * week starts with monday
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private lastWeek() {
        if (!this.filter.last_week) return;
        const now = new Date();
        this.range = { min: subDays(startOfWeek(now, { weekStartsOn: 1 }), 7), max: subDays(endOfWeek(now), 7) };
    }

    /**
     * check if the month filter is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private month() {
        if (!this.filter.month) return;

        const now = new Date();
        this.range = { min: startOfMonth(now), max: endOfDay(now) };
    }

    /**
     * check if the year is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private year() {
        if (!this.filter.year) return;
        const now = new Date();

        this.range = { min: startOfYear(now), max: endOfYear(now) };
    }

    /**
     * check if the current_quarter is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private currentQuarter() {
        if (!this.filter.current_quarter) return;
        const now = new Date();

        this.range = { min: startOfQuarter(now), max: endOfQuarter(now) };
    }

    /**
     * check if the previous_quarter is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private previousQuarter() {
        if (!this.filter.previous_quarter) return;
        const now = new Date();

        this.range = { min: subQuarters(startOfQuarter(now), 1), max: subQuarters(endOfQuarter(now), 1) };
    }

    /**
     * check if the current_fy is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private currentFy() {
        if (!this.filter.current_fy) return;
        const now = new Date();

        this.range = { min: addMonths(startOfYear(this.getFinancialDate(now)), 3), max: addMonths(endOfYear(this.getFinancialDate(now)), 3) };
    }

    /**
     * check if the previous_fy is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private previousFy() {
        if (!this.filter.previous_fy) return;
        const now = new Date();

        this.range = { min: subMonths(startOfYear(this.getFinancialDate(now)), 9), max: subMonths(endOfYear(this.getFinancialDate(now)), 9) };
    }

    /**
     * check if the financial year is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private financialYear() {
        if (!this.filter.financial_year) return;

        //@todo implement it later on
    }

    /**
     * check if the range filter is being set
     * @private
     * @return {*}
     * @memberof ProcessDateFilter
     */
    private checkRange() {
        if (!this.filter.range) return;

        this.range = this.filter.range;
    }

    private getFinancialDate(date: Date) {
        const month = date.getMonth();
        if (month < 3) {
            return subYears(date, 1);
        }
        return date;
    }
}
