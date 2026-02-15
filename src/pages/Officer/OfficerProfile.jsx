import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const OfficerProfile = () => {
    return (
        <div className="p-8 ml-64">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center h-fit">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6">
                        <img src="https://placehold.co/200x200/333/fff?text=Officer" alt="Officer" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Hassan Barrie</h2>
                    <p className="text-primary font-medium">Senior Field Officer</p>
                    <div className="mt-6 text-left space-y-2">
                        <div className="flex justify-between text-sm py-2 border-b">
                            <span className="text-gray-500">ID:</span>
                            <span className="font-medium">OFF-2023-001</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b">
                            <span className="text-gray-500">Zone:</span>
                            <span className="font-medium">Zone 4 (East)</span>
                        </div>
                    </div>
                </Card>

                <div className="md:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input label="First Name" value="Hassan" readOnly />
                                <Input label="Last Name" value="Barrie" readOnly />
                            </div>
                            <Input label="Email" value="hassan.barrie@ccrsms.gov.sl" readOnly />
                            <Input label="Phone" value="+232 76 000 000" />
                            <Button className="mt-4">Update Details</Button>
                        </form>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Security</h3>
                        <form className="space-y-4">
                            <Input label="Current Password" type="password" />
                            <Input label="New Password" type="password" />
                            <Button variant="outline" className="mt-4">Change Password</Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OfficerProfile;
