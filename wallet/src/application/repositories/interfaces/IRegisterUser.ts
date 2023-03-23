export abstract class IRegisterUser{
    abstract create(props: Object) : Promise<void>
}