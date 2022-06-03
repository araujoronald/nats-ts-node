import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { PartidaIniciadaEvent } from './PartidaIniciadaEvent'
import { Subjects } from './Subjects'

export class PartidaIniciadaSubscriber extends Subscriber<PartidaIniciadaEvent> {
  subject: Subjects.PartidaIniciada = Subjects.PartidaIniciada;
  queueGroupName = 'teste-nats-jetstream-service';

  async onMessage(data: PartidaIniciadaEvent["data"], msg: JsMsg) {
    console.log('MENSAGEM RECEBIDA [LISTENER]: ', data)
    msg.ack()
  }
}
