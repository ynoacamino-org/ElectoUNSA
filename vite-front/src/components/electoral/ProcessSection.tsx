import React from 'react';
import type { ElectoralStep } from '../../data/electoralProcess';

interface ProcessSectionProps {
    step: ElectoralStep;
    isLast?: boolean;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ step, isLast }) => {
    return (
        <div className="flex gap-4 md:gap-6 relative group w-full">
            {/* Timeline Line */}
            {!isLast && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#5e1320]/20 to-transparent group-hover:from-[#5e1320]/40 transition-colors duration-500" />
            )}

            {/* Number Badge (Timeline Node) */}
            <div className="flex-shrink-0 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#5e1320] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 border-4 border-white ring-1 ring-[#5e1320]/10">
                    {step.id}
                </div>
            </div>

            {/* Content Card */}
            <div className={`flex-1 min-w-0 ${!isLast ? 'pb-12' : 'pb-4'}`}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-3">
                        {/* Icon in Title */}
                        <div className="p-2 rounded-lg bg-[#5e1320]/5 text-[#5e1320]">
                            {step.icon}
                        </div>
                        <h2 className="text-xl font-bold text-[#5e1320]">
                            {step.title}
                        </h2>
                    </div>

                    {step.content && (
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {step.content}
                        </p>
                    )}

                    {step.list && (
                        <ul className="space-y-2 mb-4">
                            {step.list.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5e1320]/60 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {step.subsections && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-50">
                            {step.subsections.map((sub, index) => (
                                <div key={index} className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <h3 className="font-bold text-[#751829] text-sm mb-2 uppercase tracking-wide">
                                        {sub.title}
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {sub.list.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-600 text-xs">
                                                <span className="mt-1 w-1 h-1 rounded-full bg-[#5e1320] flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProcessSection;
