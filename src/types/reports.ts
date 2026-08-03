export interface ReportResponse {
  health_score: number;
  summary: ReportSummary;
  ai_summary: string[];
  journey: ReportJourney[];
  timeline: ReportTimeline[];
}

export interface ReportSummary {
  average_bp: string;
  weight: number | null;
  fluid_goal: number;
  medication: number;
}

export interface ReportJourney {
  month: string;
  score: number;
}

export interface ReportTimeline {
  month: string;
  status: string;
}
