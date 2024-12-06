import { Schema, model, } from 'mongoose';
import { IOtpValidation } from './otpValidation.interface';



const otpSchema = new Schema<IOtpValidation>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otpCode: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900 // OTP expires in 15 minutes
    }
});

const OtpValidationModel = model<IOtpValidation>('OtpValidation', otpSchema);

export default OtpValidationModel;
