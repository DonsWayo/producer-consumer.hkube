module.exports = {
    "name": "options",
    "type": "object",
    "properties": {
        "job": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "required": true,
                    "description": "the job type"
                }
            }
        },
        "setting": {
            "type": "object",
            "properties": {
                "prefix": {
                    "type": "string",
                    "default": "jobs",
                    "description": "prefix for all queue keys"
                },
                "redis": {
                    "type": "object",
                    "properties": {
                        "host": {
                            "type": "string",
                            "default": "localhost"
                        },
                        "port": {
                            "type": "integer",
                            "default": 6379
                        }
                    }
                }
            }
        }
    }
}