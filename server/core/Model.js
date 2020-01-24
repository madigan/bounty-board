/**
 * The Model represents an application-layer object. It is responsible for containing all the data related to the entity as well as conversion to previous versions of the datamodel.
 */
class Model {
    /**
     * Convert the model to a specific version.
     * If versions aren't applicable, it returns itself.
     * @param {Model} version The converted version of the model.
     */
    toVersion(version) {
        return this;
    }
}

module.exports = Model;