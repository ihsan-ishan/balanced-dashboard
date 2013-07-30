Balanced.FixtureAdapter = Balanced.BaseAdapter.extend({
    initAdapter: function () {
        this.dataMap = {};

        this.creates = [];
        this.updates = [];
        this.deletes = [];
    },

    get: function (type, uri, success, error) {
        this._checkParams(type, uri);

        var json = this.dataMap[uri];

        if(!uri) {
            throw new Error('Missing URI in adapter call for {0}'.format(type));
        }

        if(!json) {
            Ember.Logger.warn("Couldn't retrieve fixture for URI: " + uri);
        }

        // cloning in case people modify this later, don't want to screw up our fixtures!
        var clonedJson = this._cloneObject(json);
        success(clonedJson);
    },

    create: function (type, uri, data, success, error) {
        this._checkParams(type, uri);

        this.creates.push({
            type: type,
            uri: uri,
            data: data
        });

        // cloning to prevent weird data errors
        var clonedJson = this._cloneObject(data);
        success(clonedJson);
    },

    update: function (type, uri, data, success, error) {
        this._checkParams(type, uri);

        this.updates.push({
            type: type,
            uri: uri,
            data: data
        });

        // cloning to prevent weird data errors
        var clonedJson = this._cloneObject(data);
        success(clonedJson);
    },

    delete: function (type, uri, success, error) {
        this._checkParams(type, uri);

        this.deletes.push({
            type: type,
            uri: uri
        });

        success();
    },

    addFixture: function (json) {
        this.dataMap[json.uri] = json;
    },

    addFixtures: function (jsonArray) {
        _.each(jsonArray, _.bind(this.addFixture, this));
    },

    _cloneObject: function (obj) {
        if (obj !== undefined && obj !== null) {
            return JSON.parse(JSON.stringify(obj));
        } else {
            return obj;
        }
    }
});
