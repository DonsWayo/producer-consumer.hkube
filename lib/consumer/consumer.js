const EventEmitter = require('events');
const Queue = require('bull');
const validate = require('djsv');
const schema = require('./schema');
const redis = require('../helpers/redis');

class Consumer extends EventEmitter {

    constructor(options) {
        super();
        this._setting = Object.assign({}, options.setting);
        const res = validate(schema.properties.setting, this._setting);
        if (!res.valid) {
            throw new Error(res.errors[0].stack);
        }
        redis.init(this._setting.redis);
        this._setting = Object.assign({}, this._setting, redis.client);
    }

    register(options) {
        options = options || {};
        const res = validate(schema, options);
        if (!res.valid) {
            throw new Error(res.errors[0].stack);
        }
        this._queue = new Queue(options.job.type, this._setting);
        this._queue.process((job, done) => {
            const res = {
                id: job.id,
                data: job.data,
                type: job.queue.name,
                prefix: job.queue.keyPrefix,
                done: done
            }
            this.emit('job', res);
        });
    }
}

module.exports = Consumer;
