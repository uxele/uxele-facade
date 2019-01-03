import { BaseTool } from "../BaseTool";



export class PrototypeTool extends BaseTool{
  public name: string="tool_prototype_name";  
  public slug: string="tool_prototype";
  public cls: string ="fas fa-mouse-pointer";
  protected bindRenderer(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  protected unbindRenderer(): Promise<void> {
    throw new Error("Method not implemented.");
  }


}