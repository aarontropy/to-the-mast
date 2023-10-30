export type DomainEventProps<TData = never> = {
  eventId: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  dateCreated: Date;
  actorId: string;
  data: TData;
};

export default class DomainEvent<TData = never> {
  eventId: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  dateCreated: Date;
  actorId: string;
  data: TData;

  constructor(props: DomainEventProps) {
    this.eventId = props.eventId;
    this.eventType = props.eventType;
    this.aggregateId = props.aggregateId;
    this.aggregateType = props.aggregateType;
    this.dateCreated = props.dateCreated;
    this.actorId = props.actorId;
    this.data = props.data;
  }
}
