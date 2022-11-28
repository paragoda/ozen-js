// TODO: make build() invisible from outside of sdk
export interface IField {
    /**
    * Build object to describe field to server.
    * Please don't use it on client.
    * It's made to reduce memory usage on client.
    */
    build() 
}