import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_header {
    value: string;
    name: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Feedback {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface TutorialStep {
    description: string;
}
export interface Tutorial {
    subject: string;
    completedCount: bigint;
    steps: Array<TutorialStep>;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    fetchWikipediaSummary(searchTerm: string): Promise<string>;
    getAllFeedback(): Promise<Array<Feedback>>;
    getAllTutorials(): Promise<Array<Tutorial>>;
    incrementCompletedCount(subject: string): Promise<bigint>;
    saveTutorial(subject: string, steps: Array<TutorialStep>): Promise<void>;
    submitFeedback(name: string, email: string, message: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
