
class Helper {
    tryParse(json) {
        let parsed = json;
        try {
            parsed = JSON.parse(json);
        }
        catch (e) {
        }
        return parsed;
    }
}

module.exports = new Helper();
