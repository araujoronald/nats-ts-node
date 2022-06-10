import { JsMsg } from 'nats'
import { Subscriber } from './BaseSubscriber'
import { GolEvent } from './GolEvent'
import { PartidaIniciadaEvent } from './PartidaIniciadaEvent'
import { Subjects } from './Subjects'

export class GolSubscriber extends Subscriber<GolEvent> {
  subject: Subjects.Gol = Subjects.Gol;

  async onMessage(data: GolEvent["data"], msg: JsMsg) {
    console.log('MENSAGEM RECEBIDA [GOL LISTENER]: ', data)
    msg.ack()
  }
}
