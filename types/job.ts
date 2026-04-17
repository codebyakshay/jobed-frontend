export enum JobStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Job {
  id: string;
  title: string;
  timeWindow: string;
  area: string;
  status: JobStatus;
  customerNote: string;
  completedAt?: string;
  completionNote?: string;
}

export interface CompleteJobRequest {
  completionNote: string;
}
