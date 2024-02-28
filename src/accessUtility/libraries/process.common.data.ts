import { OperationException } from '@servicelabsco/nestjs-utility-services';
import { ErrorHandlingDto } from '../dtos/error.handling.dto';

export class ProcessCommonData {
    protected payload: any;

    /**
     * contains the errors object array to handle localization properly
     * @protected
     * @type {ErrorHandlingDto}
     * @memberof ProcessCommonData
     */
    protected errors: ErrorHandlingDto = { columns: {}, others: [] };

    /**
     * set a error on a given common payload
     * @protected
     * @param {string} column
     * @param {string} error
     * @memberof ProcessCommonData
     */
    protected setColumnError(column: string, error: string) {
        if (!this.errors.columns[column]) this.errors.columns[column] = [];

        this.errors.columns[column].push(error);
    }

    /**
     * set error on the common area
     * @protected
     * @param {string} error
     * @memberof ProcessCommonData
     */
    protected setError(error: string) {
        this.errors.others.push(error);
    }

    /**
     * throw exception if there are any errors
     * @protected
     * @return {*}
     * @memberof ProcessCommonData
     */
    protected throwExceptionOnError() {
        global.console.log('this.errors.columns', this.errors.columns);
        const keys = Object.keys(this.errors.columns);
        if (keys.length) throw new OperationException(this.errors);

        if (this.errors.others.length) throw new OperationException(this.errors);

        return false;
    }

    /**
     * check if the column set in the payload
     * @protected
     * @param {string} column
     * @return {*}
     * @memberof ProcessCommonData
     */
    protected getPayloadData(column: string) {
        const data = this.payload[column];
        if (typeof data === 'undefined') return null;

        return data;
    }
}
