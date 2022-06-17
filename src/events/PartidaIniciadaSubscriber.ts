import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { PartidaIniciadaEvent } from './PartidaIniciadaEvent'
import { Subjects } from './Subjects'
import { queueName } from "./Queue"

export class PartidaIniciadaSubscriber extends Subscriber<PartidaIniciadaEvent> {
  queueName = queueName;
  subject: Subjects.PartidaIniciada = Subjects.PartidaIniciada;

  async onMessage(data: PartidaIniciadaEvent["data"], msg: JsMsg) {
    msg.working()
    console.log('MENSAGEM RECEBIDA [LISTENER]: ', data)
    msg.ack()
  }
}
