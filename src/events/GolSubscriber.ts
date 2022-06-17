import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { GolEvent } from './GolEvent'
import { PartidaIniciadaEvent } from './PartidaIniciadaEvent'
import { Subjects } from './Subjects'
import { queueName } from "./Queue"

export class GolSubscriber extends Subscriber<GolEvent> {
  queueName = queueName;
  subject: Subjects.Gol = Subjects.Gol;


  async onMessage(data: GolEvent["data"], msg: JsMsg) {
    msg.working()
    console.log('MENSAGEM RECEBIDA [GOL LISTENER]: ', data)
    msg.ack()
  }
}
